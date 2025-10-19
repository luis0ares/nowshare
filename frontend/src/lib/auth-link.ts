import { ApolloLink, Observable } from "@apollo/client";
import { GraphQLFormattedError } from "graphql";

type OnErrorHandler = (error: GraphQLFormattedError) => Promise<boolean>;
type OnFailHandler = (error: GraphQLFormattedError) => Promise<void>;

/**
 * Creates a retry-once Apollo Link.
 * @param onError Called after the first attempt fails, returns true to retry.
 * @param onFail Called after the second attempt fails, receives the error.
 */
export function TokenAutoRefresh(
  onError: OnErrorHandler,
  onFail?: OnFailHandler
) {
  return new ApolloLink(
    (operation: ApolloLink.Operation, forward: ApolloLink.ForwardFunction) => {
      let retried = false;

      return new Observable<ApolloLink.Result>((observer) => {
        const execute = () => {
          const sub = forward(operation).subscribe({
            next: async (result) => {
              const gqlErrors = result.errors;
              // console.log(gqlErrors);

              if (!retried && gqlErrors && gqlErrors.length > 0) {
                const firstError = gqlErrors[0];
                const isAuthError =
                  firstError.message.includes("401") ||
                  firstError.message.toLowerCase().includes("token expired");

                if (isAuthError) {
                  retried = true;
                  const shouldRetry = await onError(firstError);
                  if (shouldRetry) {
                    execute();
                    return;
                  } else {
                    observer.error(firstError);
                    if (onFail) await onFail(firstError);
                    return;
                  }
                }
              }

              observer.next(result);
              observer.complete();
            },
            error: async (networkErr: Error) => {
              if (!retried) {
                retried = true;
                const shouldRetry = await onError(networkErr);
                if (shouldRetry) {
                  execute();
                } else {
                  observer.error(networkErr);
                  if (onFail) await onFail(networkErr);
                }
              } else {
                if (onFail) await onFail(networkErr);
                observer.error(networkErr);
              }
            },
          });

          return sub;
        };

        const s = execute();
        return () => s.unsubscribe();
      });
    }
  );
}

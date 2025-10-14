"use client";

import { MarkdownRenderer } from "@/components/markdown-renderer";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client/react";
import { EDIT_ARTICLE, IdType } from "@/graphql/mutations";
import { useRouter } from "next/navigation";
import { use } from "react";
import { Article, GET_ARTICLE } from "@/graphql/query";

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

const postFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(10, {
      message: "The title must be at least 10 characters.",
    })
    .max(200, {
      message: "The title must be at most 200 characters.",
    }),
  content: z
    .string()
    .min(50, {
      message: "The content must be at least 50 characters.",
    })
    .max(10000, {
      message: "The content must be at most 10000 characters.",
    }),
});

type PostFormValues = z.infer<typeof postFormSchema>;

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data } = useQuery<{ article: Article }>(GET_ARTICLE, {
    variables: { articleId: id },
  });

  if (!data) return null;
  return (
    <EditForm
      articleId={id}
      title={data.article.title}
      content={data.article.content}
    />
  );
}

function EditForm({
  articleId,
  title,
  content,
}: {
  articleId: string;
  title: string;
  content: string;
}) {
  const router = useRouter();

  const [updateArticle, { data, loading, error }] = useMutation<{
    updateArticle: IdType;
  }>(EDIT_ARTICLE, {
    refetchQueries: [
      { query: GET_ARTICLE, variables: { articleId: articleId } },
    ],
  });

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { title, content },
    mode: "onChange",
  });

  async function onSubmit({ title, content }: PostFormValues) {
    const result = await updateArticle({
      variables: { articleId, title, content },
    });
    console.log(result.data);
    if (result.data?.updateArticle.id)
      router.push(`/article/${result.data.updateArticle.id}`);
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl ">
      <div className="mb-8 space-y-4">
        <Link
          href="/my-articles"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to my articles
        </Link>
        <div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl text-emerald-600">
            Edit Article
          </h1>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: The Future of Artificial Intelligence"
                      className="text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a clear and descriptive title for your article.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Content
                  </FormLabel>
                  <FormControl>
                    <MarkdownEditor
                      value={field.value}
                      onChange={(value, viewUpdate) => field.onChange(value)}
                      style={{ minHeight: "280px", maxHeight: "450px" }}
                      previewWidth="100%"
                      renderPreview={() => (
                        <MarkdownRenderer content={field.value} />
                      )}
                      enableScroll={false}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-between">
                    <span>
                      Write the full content of your article. Use markdown for
                      formatting.
                    </span>
                    <span>{field.value.length} / 10000 characters</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white"
                disabled={!form.formState.isValid}
              >
                Save Article
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="mt-8 rounded-lg border bg-muted/50 p-6">
        <h3 className="font-semibold mb-2">Tips for writing a good article:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
          <li>Use an attractive and descriptive title</li>
          <li>Organize your content into sections with subtitles</li>
          <li>Include practical examples when possible</li>
          <li>Review your text before publishing</li>
          <li>Add links and references when relevant</li>
        </ul>
      </div>
    </div>
  );
}

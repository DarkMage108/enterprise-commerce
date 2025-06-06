import { format } from "date-fns/format"
import { getAllPages, getPage } from "lib/shopify"

export const revalidate = 86400
export const dynamic = "force-static"
export const dynamicParams = true

export { generateMetadata } from "./metadata"

export default async function StaticPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params

  const { slug } = params

  const page = await getPage(slug)

  if (!page) return null

  return (
    <div className="relative mx-auto max-w-container-md px-4 py-12 md:py-24 xl:px-0">
      <main className="mx-auto max-w-container-sm">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{page.title}</h1>
        <div className="mt-8 text-xl" dangerouslySetInnerHTML={{ __html: page.body }} />
        <p className="mt-8 md:mt-12">This document was last updated: {format(page.updatedAt, "MMMM do, yyyy")}</p>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  const pages = (await getAllPages()) || []

  return pages.map((page) => ({
    slug: page.handle,
  }))
}

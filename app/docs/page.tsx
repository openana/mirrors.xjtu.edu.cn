import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl w-full flex mx-auto p-4 space-x-6">
        <div>Docs</div>
        <Link href="/docs/anaconda/">
          anaconda
        </Link>
      </div>
    </div>
  )
}

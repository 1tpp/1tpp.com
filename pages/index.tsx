import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex h-screen">
        <div className="w-1/2">
          <h1 className="text-2xl font-bold">
            <span className="text-blue-500">Hello</span>
            <span className="text-red-500">World</span>
          </h1>
          <p className="text-gray-500">
            This is a simple example of a Next.js page.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

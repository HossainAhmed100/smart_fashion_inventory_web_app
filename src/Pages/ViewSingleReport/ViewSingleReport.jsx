import { useLoaderData } from "react-router-dom"


function ViewSingleReport() {
    const loaderData = useLoaderData();
    console.log("🚀 ~ ViewSingleReport ~ loaderData:", loaderData)
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
        <h1 className="text-3xl font-bold">{loaderData.length ? loaderData.length : 0}</h1>
    </div>
  )
}

export default ViewSingleReport

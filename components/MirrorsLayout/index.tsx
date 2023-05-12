import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

import { mirrorInfoMap } from './data'

interface MirrorStatus {
  name: string
  status: string
  last_update_ts: number
}

export default function MirrorsLayout({
  isLoading,
  mirrors,
}: {
  isLoading: boolean
  mirrors: MirrorStatus[]
}) {
  function getMirrorInfo(name: string) {
    if (!mirrorInfoMap.has(name))
      return <span className="font-medium text-gray-900">{name}</span>
    const mirrorInfo = mirrorInfoMap.get(name)
    return (
      <div className="block w-full font-normal text-gray-400 truncate">
        <span className="font-medium text-gray-900">{mirrorInfo.name}</span>
        {mirrorInfo.help && (
          <span className="ml-2 bg-sky-100 text-sky-800 text-xs font-medium px-1.5 py-0.5 rounded-full border border-sky-200">
            ?
          </span>
        )}
        <span
          className="ml-2 text-xs font-normal text-gray-400"
          title={mirrorInfo.desc}
        >
          {mirrorInfo.desc}
        </span>
      </div>
    )
  }
  if (mirrors.length === 0) {
    mirrorInfoMap.forEach((mirrorInfo, name) => {
      mirrors.push({
        name,
        status: 'unknown',
        last_update_ts: -1,
      })
    })
  }
  return (
    <div className="py-6 basis-3/4">
      <div className="flex items-center justify-between pb-4 overflow-hidden">
        <div>镜像列表</div>
        <label htmlFor="table-filter" className="sr-only">
          Filter
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-filter"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-sky-500 focus:border-sky-500"
            placeholder="查找镜像"
          />
        </div>
      </div>
      <table className="relative table-fixed w-full text-sm text-left text-gray-500 rounded-md overflow-hidden dark:text-gray-400">
        <thead className="text-xs text-sky-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-sky-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && false && (
            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
              <td
                colSpan={2}
                className="px-6 py-2 text-sky-900 dark:text-white"
              >
                Loading...
              </td>
            </tr>
          )}
          {mirrors.length === 0 ? (
            <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
              <td
                colSpan={2}
                className="px-6 py-2 text-gray-900 dark:text-white"
              >
                No mirrors found
              </td>
            </tr>
          ) : (
            mirrors
              .filter((mirror) => mirror.status !== 'disabled')
              .sort((a, b) =>
                a.name.localeCompare(b.name, undefined, {
                  sensitivity: 'base',
                }),
              )
              .sort((a, b) => {
                if (a.status === 'git' && b.status !== 'git') return 1
                if (a.status !== 'git' && b.status === 'git') return -1
                return 0
              })
              .sort((a, b) => {
                if (a.status === 'proxy' && b.status !== 'proxy') return 1
                if (a.status !== 'proxy' && b.status === 'proxy') return -1
                return 0
              })
              .map((mirror, key) => (
                <tr
                  key={key}
                  className={
                    `border-t transition-colors animate-fade-in ` +
                    (mirror.status === 'success'
                      ? 'bg-white hover:bg-gray-50'
                      : mirror.status === 'failed'
                      ? 'bg-orange-50 hover:bg-orange-100'
                      : mirror.status === 'syncing' ||
                        mirror.status === 'pre-syncing'
                      ? 'bg-sky-50 hover:bg-sky-100'
                      : 'bg-white hover:bg-gray-50')
                  }
                >
                  <td className="px-6 py-2">{getMirrorInfo(mirror.name)}</td>
                  <td className="px-6 py-2">
                    {mirror.status === 'unknown'
                      ? ''
                      : mirror.status === 'git'
                      ? 'Git 镜像'
                      : mirror.status === 'proxy'
                      ? '代理访问'
                      : mirror.status === 'mirrorz'
                      ? 'MirrorZ.org'
                      : mirror.last_update_ts < 0
                      ? '正在初始化'
                      : formatDistanceToNow(mirror.last_update_ts * 1000, {
                          locale: zhCN,
                        }) + '前'}
                    {mirror.status === 'git' || mirror.status === 'proxy' ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-green-200">
                        可用
                      </span>
                    ) : mirror.status === 'failed' ? (
                      <span className="bg-red-100 text-red-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-red-200">
                        失败
                      </span>
                    ) : mirror.status === 'syncing' ||
                      mirror.status === 'pre-syncing' ? (
                      <>
                        <span className="bg-sky-100 text-sky-800 text-xs font-medium ml-2 px-2.5 py-0.5 rounded border border-sky-200">
                          同步中
                        </span>
                        <svg
                          className="ml-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 100 101"
                          aria-hidden="true"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  )
}

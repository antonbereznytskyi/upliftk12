import React, { Component } from 'react'
import axios from '@/lib/axios'
import VideoPlayModal from '@/components/modal/VideoPlayModal'

const frontendUrl = process.env.NEXT_PUBLIC_AUTH_URL

const columns = [
    'No',
    'Video',
    'Lessons Name',
    'Student Number',
    'Duration',
    'Action',
]
export default class DataTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            entities: {
                data: [],
                meta: {
                    current_page: 1,
                    from: 1,
                    last_page: 1,
                    per_page: 10,
                    to: 1,
                    total: 1,
                },
            },
            first_page: 1,
            current_page: 1,
            sorted_column: 'created_at',
            offset: 4,
            order: 'asc',
            searchValue: '',
            total_records: 0,
            play_video_url: '',
            play_modal_show: false,
        }
        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.handleChangeSelect = this.handleChangeSelect.bind(this)
        this.downloadVideo = this.downloadVideo.bind(this)
        this.playVideo = this.playVideo.bind(this)
    }

    fetchEntities() {
        axios
            .get('/api/video', {
                params: {
                    page: this.state.current_page,
                    column: this.state.sorted_column,
                    order: this.state.order,
                    per_page: this.state.entities.meta.per_page,
                    searchValue: this.state.searchValue,
                },
            })
            .then(response => {
                let stateCopy = Object.assign({}, this.state)
                stateCopy.entities.data = response.data.data
                stateCopy.entities.meta.total = response.data.total_page
                stateCopy.entities.meta.last_page = response.data.total_page
                stateCopy.entities.meta.to = response.data.total_page
                stateCopy.total_records = response.data.total_records
                this.setState(stateCopy)
            })
            .catch(e => {
                console.error(e)
            })
    }
    changePage(pageNumber) {
        let stateCopy = Object.assign({}, this.state)
        stateCopy.entities.meta.current_page = pageNumber
        stateCopy.current_page = pageNumber
        this.setState(stateCopy, () => {
            this.fetchEntities()
        })
    }

    columnHead(value) {
        return value.split('_').join(' ').toUpperCase()
    }

    pagesNumbers() {
        if (!this.state.entities.meta.to) {
            return []
        }
        let from = this.state.entities.meta.current_page - this.state.offset
        if (from < 1) {
            from = 1
        }
        let to = from + this.state.offset * 2
        if (to >= this.state.entities.meta.last_page) {
            to = this.state.entities.meta.last_page
        }
        let pagesArray = []
        for (let page = from; page <= to; page++) {
            pagesArray.push(page)
        }
        return pagesArray
    }
    componentDidMount() {
        this.setState(
            { current_page: this.state.entities.meta.current_page },
            () => {
                this.fetchEntities()
            },
        )
    }

    tableHeads() {
        let icon
        if (this.state.order === 'asc') {
            icon = (
                <svg
                    className="w-5 h-5 float-right absolute top-3.5 right-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
                    />
                </svg>
            )
        } else {
            icon = (
                <svg
                    className="w-5 h-5 float-right absolute top-3.5 right-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
                    />
                </svg>
            )
        }
        return columns.map(column => {
            return (
                <th
                    className={
                        'py-3 border-b border-gray-100 cursor-pointer relative text-start '
                    }
                    key={column}
                    onClick={() => this.sortByColumn(column)}>
                    {this.columnHead(column)}
                    {column === this.state.sorted_column && icon}
                </th>
            )
        })
    }
    downloadVideo(video_url) {
        axios
            .get('/api/getVideo', {
                params: { url: video_url },
                responseType: 'blob',
            })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', video_url)
                document.body.appendChild(link)
                link.click()
            })
            .catch(error => {
                alert('this file is not exist!')
            })
    }
    playVideo(video_url) {
        this.setState({ play_video_url: video_url, play_modal_show: true })
    }
    userList() {
        let no = 0
        if (this.state.entities.data.length) {
            return this.state.entities.data.map(video => {
                no++
                return (
                    <tr className="border-b border-gray-100" key={video.id}>
                        <td className="py-1 text-start">{no}</td>
                        <td className="py-1 text-start relative">
                            <img
                                className="w-12 cursor-pointer hover:w-[3.2rem] transition-all duration-300 absolute top-1"
                                onClick={e => {
                                    this.playVideo(video.video_url)
                                }}
                                src={frontendUrl + '/images/rewind.png'}
                            />
                        </td>
                        <td className="py-1 text-start">{video.lesson_name}</td>
                        <td className="py-1 text-start">{video.student_cnt}</td>
                        <td className="py-1 text-start">200s</td>
                        <td>
                            <div className="py-1 flex justify-start">
                                <button
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition-all"
                                    onClick={e => {
                                        this.downloadVideo(video.video_url)
                                    }}>
                                    <svg
                                        className="fill-current w-4 h-4 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                                    </svg>
                                    <span>download</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                )
            })
        } else {
            return (
                <tr>
                    <td colSpan={columns.length} className="text-start">
                        No Records Found.
                    </td>
                </tr>
            )
        }
    }

    sortByColumn(column) {
        if (column === this.state.sorted_column) {
            this.state.order === 'asc'
                ? this.setState(
                      { order: 'desc', current_page: this.state.first_page },
                      () => {
                          this.fetchEntities()
                      },
                  )
                : this.setState({ order: 'asc' }, () => {
                      this.fetchEntities()
                  })
        } else {
            this.setState(
                {
                    sorted_column: column,
                    order: 'asc',
                    current_page: this.state.first_page,
                },
                () => {
                    this.fetchEntities()
                },
            )
        }
    }

    pageList() {
        return this.pagesNumbers().map(page => {
            return (
                <li
                    className={
                        page === this.state.entities.meta.current_page
                            ? 'bg-gray-500'
                            : 'bg-gray-400'
                    }
                    key={page}>
                    <button
                        className="text-white px-3"
                        onClick={() => this.changePage(page)}>
                        {page}
                    </button>
                </li>
            )
        })
    }
    handleChangeSearch(e) {
        this.setState({ searchValue: e.target.value }, () => {
            this.fetchEntities()
        })
    }
    handleChangeSelect(e) {
        let stateCopy
        stateCopy = Object.assign({}, this.state)
        stateCopy.entities.meta.per_page = e.target.value
        stateCopy.entities.meta.current_page = 1
        stateCopy.current_page = 1
        this.setState(stateCopy, () => {
            this.fetchEntities()
        })
    }
    render() {
        return (
            <div className="w-full">
                {this.props.reload == true && this.getData()}
                <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-md px-1 bg-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6 mx-1 text-gray-400">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                        <input
                            className="border-none focus:outline-none focus:border-none py-2 w-96"
                            placeholder="Search"
                            onChange={this.handleChangeSearch}></input>
                    </div>
                </div>
                <div className="bg-white text-gray-500 px-5">
                    <table className="w-full my-3 rounded-lg border-spacing-0">
                        <thead>
                            <tr className="bg-white">{this.tableHeads()}</tr>
                        </thead>
                        <tbody className="bg-white">{this.userList()}</tbody>
                    </table>
                    {this.state.entities.data &&
                        this.state.entities.data.length > 0 && (
                            <nav className="my-3">
                                <div className="flex items-center justify-end">
                                    <p>Rows per page:</p>
                                    <select
                                        className="mx-3 border-none pr-7 pl-1 focus:!shadow-none focus:ring-0 focus:border-none focus:outline-none"
                                        onChange={this.handleChangeSelect}>
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="999999">All</option>
                                    </select>
                                    <p>
                                        {(this.state.current_page - 1) *
                                            this.state.entities.meta.per_page +
                                            1}{' '}
                                        -{' '}
                                        {this.state.current_page *
                                            (this.state.entities.meta.per_page >
                                            10000
                                                ? this.state.total_records
                                                : this.state.entities.meta
                                                      .per_page) >
                                        this.state.total_records
                                            ? this.state.total_records
                                            : this.state.current_page *
                                              (this.state.entities.meta
                                                  .per_page > 10000
                                                  ? this.state.total_records
                                                  : this.state.entities.meta
                                                        .per_page)}{' '}
                                        of {this.state.total_records}
                                    </p>
                                    <ul className="flex items-center">
                                        <li
                                            className="flex items-center px-1"
                                            key="0">
                                            <button
                                                className="page-link"
                                                disabled={
                                                    1 ===
                                                    this.state.entities.meta
                                                        .current_page
                                                }
                                                onClick={() =>
                                                    this.changePage(
                                                        this.state.entities.meta
                                                            .current_page - 1,
                                                    )
                                                }>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className={
                                                        (1 !==
                                                            this.state.entities
                                                                .meta
                                                                .current_page &&
                                                            'hover:w-5 hover:h-5') +
                                                        ' w-4 h-4'
                                                    }>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                        <li className="page-item px-1">
                                            <button
                                                className="flex items-center"
                                                disabled={
                                                    this.state.entities.meta
                                                        .last_page ===
                                                    this.state.entities.meta
                                                        .current_page
                                                }
                                                onClick={() =>
                                                    this.changePage(
                                                        this.state.entities.meta
                                                            .current_page + 1,
                                                    )
                                                }>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className={
                                                        (this.state.entities
                                                            .meta.last_page !==
                                                            this.state.entities
                                                                .meta
                                                                .current_page &&
                                                            'hover:w-5 hover:h-5') +
                                                        ' w-4 h-4'
                                                    }>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                                    />
                                                </svg>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        )}
                </div>
                <VideoPlayModal
                    playModalShow={this.state.play_modal_show}
                    close={() => {
                        this.setState({
                            play_video_url: '',
                            play_modal_show: false,
                        })
                    }}
                    videoUrl={this.state.play_video_url}
                />
            </div>
        )
    }
}

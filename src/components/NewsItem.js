import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, link, author, date, source } = props
    return (
        <div>
            <div className="card">
                <div className="d-flex justify-content-end" style={{ position: 'absolute', right: '0' }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={!imageUrl ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IDoy2-zed80gYtjKfwpxtMHY0FT48SsUYREc2cgj2A&s' : imageUrl} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? 'Unknown' : author} on {new Date(date).toUTCString()}</small></p>
                    <a href={link} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}


export default NewsItem

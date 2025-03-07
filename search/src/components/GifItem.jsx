export const GifItem = ({title,url,id}) => {
    return (
    <div className='card col-6 col-sm-2 rounded-0 border-1 p-0 text-center bg-dark border-secondary'>
        <img src={ url } alt={title} />
        <br></br>
        <h3 className="fs-5 text-white"> { title} </h3>
    </div>
    )
}

    
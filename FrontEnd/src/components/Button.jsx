export function Button ({type, handleClick, children}) {
    const className = `button-${type}`
    return( 
    <button className={className} onClick={handleClick} type="submit">{children}</button>
    )
}
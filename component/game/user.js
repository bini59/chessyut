const User_info = (props)=>{


    // user = {
    //     name : String,
    //     lvl : int,
    //     rating : int,
    //     win_lose : int array[2]
    // }
    const checkMe = props.me;
    const user = props.user


    return (
        <div className="user-info" id={checkMe}>
            <img className="usr-image" />
            <div className="usr-data">
                <div className="usr-1 usr-data-text">
                    <span className="lvl" style={{"marginRight":"10px"}}>Lv.{user.lvl}</span>
                    <span className="usr-name">{user.name}</span>
                </div>
                <div className="usr-2 usr-data-text">
                    <span className="usr-rating">Rating : {user.rating}</span>
                </div>
                <div className="usr-3 usr-data-text">
                    <span className="usr-win" style={{"marginRight":"10px"}}>승 : {user.win_lose[0]}</span>
                    <span className="usr-lose">패 : {user.win_lose[1]}</span>
                </div>
            </div>

        </div>
    )
}

export default User_info
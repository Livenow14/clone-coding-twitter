import {authService, dbService} from "fbase";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Nweet from "../components/Nweet";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory();
    const [nweets, setNweets] = useState([]);
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName});
            refreshUser();
        }
    }

/*    const getMyNweets = async () => {
        const findNweets = await dbService.collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "asc")
            .get();

        const map = findNweets.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNweets(map);

        console.log(findNweets.docs.map((doc) => doc.data()));
    };

    useEffect(() => {
        getMyNweets();

    }, []);*/

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};

export default Profile;
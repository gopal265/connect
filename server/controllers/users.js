import User from "../models/users.js";

export const getUser = async (req,res) =>{

    try {
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const getUserFriends = async (req,res) =>{
    try {
        const {id} = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map(id =>  User.findById(id))
        )

        const formattedFriends = friends.map(({ _id,firstName,lastName,userName,location,occupation,picture}) =>{
            return ({ _id,firstName,lastName,userName,location,occupation,picture})
        })
        res.status(200).json({friends:formattedFriends,friendsIds:user.friends} )
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const addRemoveFriend = async (req,res) =>{
    try {
        
        const  {id,friendId} = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter(id => id !== friendId)
            friend.friends = friend.friends.filter(id => id !== id)
        }
        else{
            user.friends.push(friendId)
            friend.friends.push(id)
        }

        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
          );

        const formattedFriends = friends.map(({ _id,firstName,lastName,userName,location,occupation,picture}) =>{
            return ({ _id,firstName,lastName,userName,location,occupation,picture})
        })

        res.status(200).json({friendsList:formattedFriends,friends:user.friends})
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

export const updateUser =  async (req,res) =>{
    try {
        const {id} = req.params
        const data = req.body
     
        const user = await User.findByIdAndUpdate(id,
            {
               firstName: data.firstName,
               lastName: data.lastName,
               userName: data.userName,
               location:data.location,
               occupation:data.occupation,
               picture:data.picture
            },
            {new : true})
         const updateUser = await User.findById(id)
        
        res.status(200).json(updateUser)


    } catch (error) {
        res.status(404).json(error)
    }
}
export const searchUser = async (req,res) =>{
    try {
        const {username} = req.params
        const users = await User.find({userName : new RegExp(username, 'i')})
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}

export const profileViewed = async (req,res)=>{
    try {
        const {id} =  req.params
        const {userViewedId} = req.body
        const user = await User.findById(id)
        if (user.viewedProfile.includes(userViewedId)){
            res.status(200).json({message:"already user viewed the profile"})
        }
        else{
            user.viewedProfile.push(userViewedId)
        }
       
        await user.save()
        res.status(200).json(user)
        

    } catch (error) {
        res.status(500).json(error)
    }
}

export const likedProfile = async(req,res) =>{
    try {
        const {id,userLikedId} = req.params
        const user  = await User.findById(id)
        if (user.impressions.includes(userLikedId)){
           user.impressions = user.impressions.filter(el => el !== userLikedId)
        }
        else{
            user.impressions.push(userLikedId)
            
        }
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

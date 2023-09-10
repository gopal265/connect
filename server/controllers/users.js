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
        res.status(200).json(formattedFriends )
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

        const formattedFriends = friends.map(({ _id,firstName,lastName,loaction,occupation,picture}) =>{
            return ({ _id,firstName,lastName,loaction,occupation,picture})
        })

        res.status(200).json({friendsList:formattedFriends,user:user})
        
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
               location:data.loaction,
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
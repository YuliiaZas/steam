export interface UserI {
  _id: string,
  email?: string,
  password?: string,
  username?: string,
  age?: number,
  friends?: string[],
  games?: string[],
  friendsRequests?: {
    received?: FriendsRequestI[],
    sent?: FriendsRequestI[],
  },
}

export interface FriendsRequestI {
  to?: string,
  from?: string,
  status?: string,
  createdDate?: Date,
}

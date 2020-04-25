import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/auth-context'

export const LoginLink = () => {
  const authURL = `https://dev.are.na/oauth/authorize?client_id=${process.env.APPLICATION_ID}&redirect_uri=${process.env.APPLICATION_CALLBACK}&response_type=code`
  return (
    <a href={authURL}>Login</a>
  )
}
import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Info {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  info: Info[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <div className="mb-40">
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Posts</Typography>
        {data.info.map((info, index) => (
          <div key={index} style={{ marginBottom: '3rem' }}>
            <Typography variant="h6" gutterBottom style={{ color: 'white' }}>{info.title}</Typography>
            <Typography variant="body2" gutterBottom style={{ color: 'white' }}>{info.content}</Typography>
          </div>
        ))}
      </Container>
    </Main>
  );
};

export default Home;

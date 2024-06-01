"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@material-ui/icons/Delete';

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

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-1/2 justify-start'>
        <Typography variant="h4">Infos</Typography>
        <Formik
          initialValues={{ infos: data.info }}
          onSubmit={(values, actions) => {
            axios.put('/api/user', { ...data, info: values.infos })
              .then(res => {
                mutate('/api/user', { ...data, info: values.infos }, false);
                console.log('Posts updated successfully');
              })
              .catch(err => {
                console.error('Error updating posts:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <FieldArray name="infos">
                {({ push, remove }) => (
                  <div>
                    {values.infos.map((info, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <Field
                          name={`infos.${index}.title`}
                          as={TextField}
                          label="Title"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <Field
                          name={`infos.${index}.content`}
                          as={TextField}
                          label="Content"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          aria-label="delete"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => push({ title: '', content: '' })}
                    >
                      Add Info
                    </Button>
                  </div>
                )}
              </FieldArray><br /><br />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Main>
  );
}

export default ProfilePage;

import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email().label('Email').required(),
});

const ValidationSchemaExample = () => (
    <div>
        <h1>Signup</h1>

        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
            }}
        >
            {({ errors, touched }) => (
                <Form>
                    <Field name="firstName" />
                    {errors.firstName && touched.firstName ? (
                        <div>{errors.firstName}</div>
                    ) : null}
                    <Field name="lastName" />
                    {errors.lastName && touched.lastName ? (
                        <div>{errors.lastName}</div>
                    ) : null}
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export const BasicArrayExample = () => (
    <div>
        <h1>Friends</h1>
        <Formik
            initialValues={{
                friends: ['jared', 'ian'],
                me:'Me',
                social: {
                    facebook: 'face',
                },
                'owner.fullname': 'Nurbek',
                toggle:true,
                friends2: [
                    {
                        name: 'qwe',
                        email: 'qwe@qwe.qwe',
                    },
                ],
            }}
            onSubmit={values => {
                // same shape as initial values
            }}
        >
            {({errors, values})=>{
                return <Form>
                    <Field name="me" validate={()=>'error'} />
                    {errors.me && <div>{errors.me}</div>}


                    <br/>
                    <br/>
                    <Field name="friends[0]" validate={()=>'jared error'} />
                    {errors.friends && errors.friends[0] && <div>{errors.friends[0]}</div>}
                    <br/>
                    <br/>
                    <Field name="friends[1]" />
                    <Field name="social.facebook" />
                    <Field name="['owner.fullname']" />
                    <Field type="checkbox" name="toggle" />
                    {`${values.toggle}`}
                    <br/>

                    <Field name="social.facebook" as='textarea' >
                        Textttt
                    </Field>
                    <br/>
                    <br/>
                    <Field name="friends2[0].name" />
                    <Field name="friends2[0].email" />
                    <br/>
                    <br/>

                    <button type="submit">Submit</button>
                </Form>;
            }}
        </Formik>
    </div>
);



const initialValues = {
    friends: [
        {
            name: 'Age',
            email: 'age@mail.ru',
        },
    ],
};

const InviteFriends = () => (
    <div>
        <h1>Invite friends</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ values }) => (
                <Form>
                    <FieldArray name="friends">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.friends.length > 0 &&
                                values.friends.map((friend, index) => (
                                    <div className="row" key={index}>
                                        <div className="col">
                                            <label htmlFor={`friends.${index}.name`}>Name</label>
                                            <Field
                                                name={`friends[${index}].name`}
                                                type="text"
                                            />
                                            <ErrorMessage
                                                name={`friends.${index}.name`}
                                                component="div"
                                                className="field-error"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor={`friends.${index}.email`}>Email</label>
                                            <Field
                                                name={`friends.${index}.email`}
                                                type="email"
                                            />
                                            <ErrorMessage
                                                name={`friends.${index}.name`}
                                                component="div"
                                                className="field-error"
                                            />
                                        </div>
                                        <div className="col">
                                            <button
                                                type="button"
                                                className="secondary"
                                                onClick={() => remove(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    className="secondary"
                                    onClick={() => push({ name: '', email: '' })}
                                >
                                    Add Friend
                                </button>
                            </div>
                        )}
                    </FieldArray>
                    <button type="submit">Invite</button>
                </Form>
            )}
        </Formik>
    </div>
);


export default InviteFriends;
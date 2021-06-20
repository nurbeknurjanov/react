import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
    friendsKey: [
        {
            name: '',
            email: '',
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
                    <FieldArray name="friendsKey">
                        {({ insert, remove, push }) => (
                            <div>
                                {values.friendsKey.length > 0 &&
                                values.friendsKey.map((friend, index) => (
                                    <div className="row" key={index}>
                                        <div className="col">
                                            <label htmlFor={`friendsKey.${index}.name`}>Name</label>
                                            <Field
                                                name={`friendsKey.${index}.name`}
                                                placeholder="Jane Doe"
                                                type="text"
                                            />
                                            <ErrorMessage
                                                name={`friendsKey.${index}.name`}
                                                component="div"
                                                className="field-error"
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor={`friendsKey.${index}.email`}>Email</label>
                                            <Field
                                                name={`friendsKey.${index}.email`}
                                                placeholder="jane@acme.com"
                                                type="email"
                                            />
                                            <ErrorMessage
                                                name={`friendsKey.${index}.name`}
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
                                    onClick={() => push({ name: 'new', email: '' })}
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
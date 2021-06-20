import React, {useState} from 'react';
import { Formik, Field, FastField, Form } from 'formik';
import * as Yup from 'yup';

const Basic = () => {

    const [count, setCount] = useState(0);

    return (

        <div>
            <h1>Sign Up</h1>
            <button onClick={()=>setCount(count+1)}>{count}</button>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    middleInitial: '',
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().required(),
                    middleInitial: Yup.string().required(),
                    lastName: Yup.string().required(),
                    email: Yup.string().email().required(),
                })}
                onSubmit={values => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
            >
                {({touched, errors, submitCount}) => {

                    return <Form>
                        submitCount={submitCount}
                        <br/>
                        <br/>
                        {/** This <FastField> only updates for changes made to
                         values.firstName, touched.firstName, errors.firstName */}
                        <label htmlFor="firstName">First Name</label>
                        <br/>
                        <Field name="firstName" />

                        {/** Updates for all changes because it's from the
                         top-level formikProps which get all updates */}
                        {touched.firstName && errors.firstName && (
                            <div>{errors.firstName}</div>
                        )}


                        <br/>
                        <br/>
                        <label htmlFor="middleInitial">Middle Initial Fast, self and firstname</label>
                        <FastField name="middleInitial" >
                            {({ field, form, meta }) => {
                                console.log('form', form);
                                return (
                                    <div>


                                        <input {...field} />
                                        {/**
                                         * This updates normally because it's from the same slice of Formik state,
                                         * i.e. path to the object matches the name of this <FastField />
                                         */}
                                        Error: {meta.touched ? meta.error : null}

                                        {/** This won't ever update since it's coming from
                                         from another <Field>/<FastField>'s (i.e. firstName's) slice   */}
                                        <br/>
                                        Count not react:{count}
                                        <br/>
                                        <b>never update too :
                                            {form.touched.firstName && form.errors.firstName
                                                ? form.errors.firstName
                                                : null}</b>

                                        <br/>
                                        {/* This doesn't update either */}
                                        Never update submitCount: {form.submitCount}

                                        <button
                                            type="button"
                                            onClick={()=>form.setFieldValue('middleInitial', 'No one')}
                                        >
                                            Set middle initial
                                        </button>
                                    </div>
                                )
                            }}
                        </FastField>

                        <br/>
                        <br/>
                        {/** Updates for all changes to Formik state
                         and all changes by all <Field>s and <FastField>s */}
                        <label htmlFor="lastName">LastName Field Error of firstname</label>
                        <Field name="lastName" placeholder="Baby">
                            {({field, form, meta}) => {
                                return (
                                    <div>
                                        count: {count}
                                        <br/>
                                        <input {...field} />
                                        {/**  Works because this is inside
                                         of a <Field/>, which gets all updates */}
                                        {form.touched.firstName && form.errors.firstName
                                            ? form.errors.firstName
                                            : null}
                                    </div>
                                )
                            }}
                        </Field>

                        <br/>
                        <br/>
                        {/** Updates for all changes to Formik state and
                         all changes by all <Field>s and <FastField>s */}
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" >
                            {({field, form, meta})=>{
                                return <input {...field} />;
                            }}
                        </Field>
                        {touched.email && errors.email && (
                            <div>{errors.email}</div>
                        )}

                        <button type="submit">Submit</button>
                    </Form>;
                }}
            </Formik>
        </div>
    )
};

export default Basic;
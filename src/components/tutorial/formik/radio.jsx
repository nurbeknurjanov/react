import React from 'react';
import { Formik, Field, Form } from 'formik';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const Basic = () => (
    <div>
        <h1>Sign Up</h1>
        <Formik
            initialValues={{
                toggle: true,
                check: [],
                switch:'One'
            }}
            onSubmit={async (values) => {
                await sleep(500);
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ values }) => (
                <Form>
                    {/*
            This first checkbox will result in a boolean value being stored. Note that the `value` prop
            on the <Field/> is omitted
          */}
                    <label>
                        <Field type="checkbox" name="toggle" />
                        {`${values.toggle}`}
                    </label>

                    {/*
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
                    <div id="checkbox-group">check</div>
                    {`${values.check}`}
                    <div role="group" aria-labelledby="checkbox-group">
                        <label>
                            <Field type="checkbox" name="check" value="One" />
                            One
                        </label>
                        <label>
                            <Field type="checkbox" name="check" value="Two" />
                            Two
                        </label>
                        <label>
                            <Field type="checkbox" name="check" value="Three" />
                            Three
                        </label>
                    </div>

                    <br/>
                    <br/>
                    <label>
                        <Field type="radio" name="switch" value='One' />
                        <Field type="radio" name="switch" value='Two' />
                        {`${values.switch}`}
                    </label>
                    <br/>
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Basic;

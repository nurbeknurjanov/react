import React from 'react';
import { useFormik, FormikProvider, Form, useField } from 'formik';
import * as Yup from 'yup';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TextInputLiveFeedback = ({ label, helpText, ...props }) => {
    const [field, meta] = useField(props);

    // Show inline feedback if EITHER
    // - the input is focused AND value is longer than 2 characters
    // - or, the has been visited (touched === true)
    const [didFocus, setDidFocus] = React.useState(false);
    const handleFocus = () => setDidFocus(true);

    const showFeedback = (didFocus && field.value.trim().length > 2) || meta.touched;

    return (
        <div
        >
            {showFeedback ? (meta.error ? 'invalid' : 'valid') : ''}
            <br/>

            <div className="flex items-center space-between">
                {showFeedback ? (
                    <div
                    >
                        {meta.error ? meta.error : '✓'}
                    </div>
                ) : null}
            </div>


            <input
                {...props}
                {...field}
                onFocus={handleFocus}
            />
        </div>
    );
};

const Example = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        onSubmit: async (values) => {
            await sleep(500);
            alert(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required')
                .min(8, 'Must be at least 8 characters')
        }),
    });

    return (
        <FormikProvider value={formik}>
            <Form>
                <TextInputLiveFeedback
                    name="username"
                />
                <div>
                    <button type="submit">Submit</button>
                    <button type="reset">Reset</button>
                </div>
            </Form>
        </FormikProvider>
    );
};

export default  Example;
import {Formik, useFormik, FormikProvider, Form, Field} from 'formik';

const Basic = () => {

    const formikOptions = {
        initialValues: { email: '', password: '' },
        validate: values => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        },
    };

    return <div>
        <Formik {...formikOptions} >
            {({errors, touched, isSubmitting})=>{
                return             <Form>
                    <Field
                        name="email"
                    />
                    {errors.email && touched.email && errors.email}
                    <br/>
                    <br/>
                    <br/>
                    <Field
                        name="password"
                    />
                    {errors.password && touched.password && errors.password}
                    <br/>
                    <br/>
                    <br/>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            }}
        </Formik>

    </div>

    const formik = useFormik(formikOptions);
    return <div>
        <FormikProvider value={formik} >
            <Form>
                <Field
                    name="email"
                />
                {formik.errors.email && formik.touched.email && formik.errors.email}
                <br/>
                <br/>
                <br/>
                <Field
                    name="password"
                />
                {formik.errors.password && formik.touched.password && formik.errors.password}
                <br/>
                <br/>
                <br/>
                <button type="submit" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </Form>
        </FormikProvider>

    </div>

};

export default Basic;
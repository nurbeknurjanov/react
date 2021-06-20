import {Formik, useFormik, FormikProvider} from 'formik';

const Basic = () => {

    const formik = useFormik({
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
    });


    return <div>
        <h1>Anywhere in your app!</h1>

        <form onSubmit={formik.handleSubmit}>
            <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && formik.errors.email}
            <br/>
            <br/>
            <br/>
            <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && formik.errors.password}
            <br/>
            <br/>
            <br/>
            <button type="submit" disabled={formik.isSubmitting}>
                Submit
            </button>


        </form>

    </div>

};

export default Basic;
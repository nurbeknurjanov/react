import { Formik, Form } from 'formik';

const CreateTodo = () => {

    const initValues = {email: 'nurbek@mail.ru', password: ''};
    const onSubmit = (values, {setSubmitting}) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const renderContent = ({
                               values,
                               errors,
                               touched,
                               handleChange,
                               handleBlur,
                               handleSubmit,
                               isSubmitting,
                               /* and other goodies */
                           }) => {

        //return <form onSubmit={handleSubmit}>
        return <Form>
            <p>
                <input
                    type="email"

                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                <br/>
                {errors.email && touched.email && errors.email}
            </p>
            <p>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                <br/>
                {errors.password && touched.password && errors.password}
            </p>
            <p>
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
            </p>
        </Form>
    }

    return <div>
        <h1>Create todo</h1>
        <Formik
            initialValues={initValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {
                <Form>
                    <p>
                        <button type="submit">
                            Submit
                        </button>
                    </p>
                </Form>

                //  (all)=>renderContent(all)
            }
        </Formik>
    </div>
};


export default CreateTodo;
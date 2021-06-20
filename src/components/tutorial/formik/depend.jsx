import React, {useRef} from 'react';
import { Formik, Field, Form, useField, useFormikContext } from 'formik';

const MyField = (props) => {
    const {
        values: { country },
        touched,//общий touched {country: true}
        setFieldValue,
        setFieldError,
        setFieldTouched,
        //...other
    } = useFormikContext();

    const children = useRef(<option value="">select</option>);//тут используем просто как переменную
    //чтоб она не переобновлялась


    const [field, meta] = useField('city');

    React.useEffect(() => {
        // set the value of textC, based on textA and textB

        if(country==='usa'){
            setFieldValue(props.name, 'alabama');
            children.current = <>
                <option value="new-york">New York</option>
                <option value="alabama">Alabama</option>
            </>;
        }
        if(country==='russia'){
            setFieldValue(props.name, 'moscow');
            children.current = <>
                <option value="moscow">Moscow</option>
                <option value="st.peterburg">St Peterburg</option>
            </>;
        }
        if(country===''){
            setFieldValue(props.name, '');
            setFieldError(props.name, 'Required');
            setFieldTouched(props.name, true);
            children.current = <option value="">select</option>;
        }

    }, [country, touched.country, setFieldValue,
        setFieldError, setFieldTouched, props.name]);// setFieldValue, props.name надо чтоб чисто не ругался


    //<input {...props} {...field} />
    return (
        <>
            <Field {...props} {...field}  as="select" children={children.current} />
            {meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    );
};

function App() {
    // Note that we provide initalValues all 3 fields.
    const initialValues = { country: '' , city:''};
    return (
        <div className="App">
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => alert(JSON.stringify(values, null, 2))}
            >
                <div className="section">
                    <Form>
                        <label>
                            <Field as="select" name="country" placeholder='Countries'>
                                <option value="">select</option>
                                <option value="usa">USA</option>
                                <option value="russia">RUSSIA</option>
                            </Field>
                        </label>
                        <label>
                            <MyField name="city" as='select' >
                                <option value="">select</option>

                            </MyField>
                        </label>
                        <button type="submit">Submit</button>
                    </Form>
                </div>
            </Formik>
        </div>
    );
}

export default App;
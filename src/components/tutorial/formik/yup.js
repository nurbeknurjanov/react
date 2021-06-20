/*
const yup = require("yup");
const yupObject = yup.object().shape({
    price: yup.number(),
    year: yup.number().required(),
    model: yup.string().required(),
    engine: yup.string().required()
});

const car = {
    year: 200,
    model: "Hyundai",
    engine: "Petrol",
    price: 2000
};

yupObject
    .validate(car)
    .then(function(value) {
        console.log(value); // returns car object
    })
    .catch(function(err) {
        console.log(err);
    });

yupObject.validate(car); //ValidationError: engine is a required field
*/

//.test("is-adult", "${path} is not adult", value => value >=18),
/*test("is-adult", "${path} is not adult", (value) => {
    if(value)
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(value >=18);
            }, 2000)
        });
}),*/
/*.test(
    "is-tea",
    "${path} is not tea",
    async value => (await value) === "tea"
)*/


/*const schema = object({
    isMorning: boolean(),
    tea: string().when("isMorning", {
        is: true,
        then: yup.required()
    })
});*/
/*const schema = yup.object().shape({
    isMorning: yup.boolean(),
    isSunday: yup.boolean(),
    coffee: yup.number().when(["isMorning", "isSunday"], {
        is: (isMorning, isSunday) => {
            //any complex calulation
            return isMorning && !isSunday;
        },
        then: yup.number().required()
    })
});*/

/*let orderTea = yup.object().shape({
    bevrage: yup
        .string()
        .test(
            "is-tea",
            "${path} is not tea",
            async value => (await value) === "tea"
        )
});
await orderTea.validate({ bevrage: "coffee" });*/
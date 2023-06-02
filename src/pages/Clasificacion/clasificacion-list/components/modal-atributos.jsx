
import { Button, Grid, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { Field, Formik, Form, useFormik, FieldArray, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";

import * as Yup from "yup"; // component props interface
import { Request } from "utils/http";
// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));

const AtributoModal = ({
    open,
    data,
    onClose,
    editClasificacion,
    hijo
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [context, setContext] = useContext(Context);


    /*METODOS */

    /*API */

    useEffect(() => {

    }, [data])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            Atributos
        </H2>

        <form >
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Formik
                    initialValues={{
                        users: [{
                            name: "deshan madurajith",
                            email: "desh@email.com"
                        },
                        {
                            name: "Hello Desh",
                            email: "hello@email.com"
                        }

                        ],
                        organizationName: []
                    }}
                    validationSchema={Yup.object({
                        organizationName: Yup.string().required(
                            "Organization Name is required"
                        ),
                        users: Yup.array().of(
                            Yup.object().shape({
                                name: Yup.string().required("Name required"),
                                email: Yup.string()
                                    .required("email required")
                                    .email("Enter valid email")
                            })
                        )
                    })}
                    onSubmit={values => alert(JSON.stringify(values, null, 2))}
                >

                    <Form>
                        <h5>Form </h5>
                        <Field placeholder="Organization name" name={`organizationName`} />
                        <ErrorMessage name={`organizationName`} />
                        <h5>Organzation users </h5>
                        <FieldArray
                            name="users"
                            render={arrayHelpers => {
                                const users = values.users;
                                return (
                                    <div>
                                        {users && users.length > 0
                                            ? users.map((user, index) => (
                                                <div key={index}>
                                                    <Field
                                                        placeholder="user name"
                                                        name={`users.${index}.name`}
                                                    />
                                                    <ErrorMessage name={`users.${index}.name`} />
                                                    <br />

                                                    <Field
                                                        placeholder="user email"
                                                        name={`users.${index}.email`}
                                                    />
                                                    <ErrorMessage name={`users.${index}.email`} />

                                                    <br />

                                                    <button
                                                        type="button"
                                                        onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                    >
                                                        -
                                                    </button>
                                                    <br />
                                                    <br />
                                                </div>
                                            ))
                                            : null}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    name: "",
                                                    email: ""
                                                })
                                            } // insert an empty string at a position
                                        >
                                            add a User
                                        </button>
                                        <br />
                                        <br />
                                        <br />
                                        <div>
                                            <button type="submit">Form Submit</button>
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <hr />
                    </Form>
                </Formik>

            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fullWidth type="submit" variant="contained">
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};
export default AtributoModal;
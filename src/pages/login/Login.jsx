import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { history } from "helpers";
import { authActions } from "store";
import { Button, Card, Elevation, H3, InputGroup, Label } from "@blueprintjs/core";

export { Login };

function Login() {
  const dispatch = useDispatch();
  const authUser = useSelector(x => x.auth.user);
  const authError = useSelector(x => x.auth.error);

  useEffect(() => {
    if (authUser) history.navigate("/");
  }, []);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required")
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  function onSubmit({ username, password }) {
    return dispatch(authActions.login({ username, password }));
  }

  return (
    <div className="app-container">
      <Card elevation={Elevation.ZERO} className="mw-25">
        <H3>Login</H3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Username
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputGroup
                  {...register("username")}
                  onChange={onChange}
                  onBlur={onBlur}
                  leftIcon="user"
                  intent={errors.username ? "danger" : "none"}
                />
              )}>
            </Controller>
          </Label>
          <Label>Password
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <InputGroup
                  {...register("password")}
                  type="password"
                  onChange={onChange}
                  onBlur={onBlur}
                  leftIcon="lock"
                  intent={errors.username ? "danger" : "none"}
                />
              )}>
            </Controller>
          </Label>
          <Button loading={isSubmitting} icon="arrow-right" type="submit">
            Login
          </Button>
          {authError &&
            <p>{authError.message}</p>
          }
        </form>
      </Card>
    </div>
  )
}
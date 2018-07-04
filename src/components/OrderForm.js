import React from 'react'
// import { Select as ReactSelect } from 'react-select';
// import '../css/select.css';
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import {
  Box,
  Button,
  // Checkbox,
  // Col,
  ControlFeedback,
  // FormCheck,
  // FormCheckLabel,
  FormGroup,
  Input,
  Label,
  // Radio,
  // RadioGroup,
  // Row,
  Select,
  Textarea,
  // Typography
} from "smooth-ui";

import PARAMS from '../Constants';

const adapt = Component => ({
  input,
  meta: {error, touched },
  children,
  ...rest
}) => {
  // console.log("valid", valid);
  children = (error && touched)? <ControlFeedback valid={false}>{error}</ControlFeedback> : "";
  return <div><Component {...input} {...rest} />{children}</div>
};

const AdaptedInput = adapt(Input);
const AdaptedSelect = adapt(Select);
const AdaptedTextarea = adapt(Textarea);

const UkrPostForm = ({onSubmit, initialValues, orderPrice}) => (
  
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, reset, submitting, pristine, values }) => {

        return (
        <form onSubmit={handleSubmit}>
    
          <FormGroup>
            <Field
              name="firstName"
              component={AdaptedInput}
              type="text"
              placeholder="Имя получателя"
              required
              minLength={3}
              tooShort="Имя должно быть длиннее"
              valueMissing="Введите имя, пожалуйста!"
              control
            />
          </FormGroup>
          <FormGroup>
            <Field
              name="lastName"
              component={AdaptedInput}
              type="text"
              placeholder="Фамилия получателя"
              required
              minLength={3}
              tooShort="Фамилия должна быть длиннее"
              valueMissing="Введите фамилию, пожалуйста!"
              control
            />
          </FormGroup>

          <FormGroup>
            <Field
              name="email"
              component={AdaptedInput}
              type="email"
              placeholder="E-mail"
              required
              valueMissing="Введите e-mail, пожалуйста!"
              pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[A-Za-z]{2,}(\.[A-Za-z]{2,})?"
              patternMismatch="E-mail введен не правильно"
              control
            />
          </FormGroup>
          <FormGroup>
            <Label>Выберите способ доставки и оплаты</Label>
            <Field
              name="delivery"
              component={AdaptedSelect}
              options={PARAMS.DELIVERY_TYPES}
              control
            />
          </FormGroup>      
          {values.delivery === "ukr_post" && 
            (<div className="order-delivery">
              <FormGroup>
                <Field
                  name="postIndex"
                  component={AdaptedInput}
                  type="text"
                  placeholder="Индекс"
                  required
                  valueMissing="Введите почтовый индекс, пожалуйста!"
                  pattern="[0-9]{5}"
                  patternMismatch="Почтовый индекс введен не правильно"
                  control
                />
              </FormGroup>
              <FormGroup>
                <Field
                  name="city"
                  component={AdaptedInput}
                  type="text"
                  placeholder="Населенный пункт"
                  required
                  valueMissing="Введите населенный пункт, пожалуйста!"
                  minLength={5}
                  tooShort="Слишком короткое название"
                  control
                />              
              </FormGroup>              
              <FormGroup>
                <Field
                  name="address"
                  component={AdaptedInput}
                  type="text"
                  placeholder="Адрес"
                  required
                  valueMissing="Введите адрес, пожалуйста!"
                  minLength={5}
                  tooShort="Слишком короткий адрес"
                  control
                />              
            </FormGroup>
            <ControlFeedback valid={false}>Оплата на карточку: реквизиты прийдут на e-mail.</ControlFeedback>
            </div>

            )
          }

            <FormGroup>
              <Label>Примечания к заказу</Label>
              <Field
                name="notes"
                component={AdaptedTextarea}
                type="text"
                control
              />              
          </FormGroup>
          <div className="order-price">
              <p>Стоимость заказа: {orderPrice} грн</p>
              <p>Стоимость доставки: {PARAMS.DELIVERY_PRICE[values.delivery]} грн</p>
              <p>Вместе: {orderPrice + Number(PARAMS.DELIVERY_PRICE[values.delivery])} грн</p>
          </div>
          <Box margin="10px 0" justifyContent="flex-end">
            <Button 
              variant="primary"
              type="submit" 
              disabled={submitting || pristine}
              >
              Заказать
            </Button>
          </Box>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
      }
    />
)


export default UkrPostForm;

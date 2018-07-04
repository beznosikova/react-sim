import React from 'react'
import { Form } from 'react-final-form'
import { Field } from 'react-final-form-html5-validation'
import {
  Box,
  Button,
  ControlFeedback,
  FormGroup,
  Input,
  Label,
  Select,
  Textarea,
} from "smooth-ui";

import PARAMS from '../Constants';

const adapt = Component => ({
  input,
  meta: {error, touched },
  children,
  ...rest
}) => {
  children = (error && touched)? <ControlFeedback valid={false}>{error}</ControlFeedback> : "";
  return <div><Component {...input} {...rest} />{children}</div>
};

const AdaptedInput = adapt(Input);
const AdaptedSelect = adapt(Select);
const AdaptedTextarea = adapt(Textarea);

const OrderForm = ({onSubmit, initialValues, orderPrice}) => {

  return (
    <Form
      initialValues={initialValues}
      onSubmit={onSubmit}
      render={({ handleSubmit, reset, submitting, pristine, values }) => {

        const isUkrPost = values.delivery === "ukr_post";
        const isPaymentCard = values.delivery !== "nova_pochta_np";
        
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
              maxLength={20}
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
              maxLength={20}
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
          
          <div className="order-delivery">
            <FormGroup>
              <Field
                name="postIndex"
                component={AdaptedInput}
                type="text"
                placeholder={(isUkrPost) ? `Индекс` : `Номер отделения`}
                required
                valueMissing={(isUkrPost) ? `Введите почтовый индекс, пожалуйста!` : `Введите номер отделения, пожалуйста!`}
                pattern={(isUkrPost) ? `[0-9]{5}` : `[0-9]{1,3}`}
                patternMismatch="Ввод не правильный"
                maxLength={(isUkrPost) ? 5 : 3}
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
                minLength={2}
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
                minLength={10}
                tooShort="Слишком короткий адрес"
                control
              />              
            </FormGroup>
            {!isUkrPost && (
              <FormGroup>
                <Field
                  name="phone"
                  component={AdaptedInput}
                  type="text"
                  placeholder="(068)-777-77-77"
                  required
                  valueMissing="Введите телефон, пожалуйста!"
                  pattern="[\s+0-9()-]{10,18}"
                  patternMismatch="Ввод не правильный"
                  control
                />              
            </FormGroup>
              )}
            <ControlFeedback valid={false}>
                {(isPaymentCard)? `Оплата на карточку: реквизиты прийдут на e-mail.` 
                  : `Оплата при получении в отделении Новой почты.`}
            </ControlFeedback>
          </div>

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
        </form>
      )}
      }
    />
)
}

export default OrderForm;

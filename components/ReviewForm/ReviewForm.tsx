import React, { useState } from 'react';
import styles from './ReviewForm.module.css';
import { ReviewFormProps } from './ReviewForm.props';
import cn from 'classnames';
import { Button, Input, Rating, Textarea } from '..';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewSendResponse } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSendResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input error={errors.name} {...register('name', { required: { value: true, message: 'Заполните имя' } })} placeholder='Имя' />
                <Input error={errors.title} {...register('title', { required: { value: true, message: 'Заполните заголовок' } })} placeholder='Заголовок отзыва' className={styles.title} />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller rules={{ required: { value: true, message: 'Укажите рейтинг' } }} control={control} name='rating' render={({ field }) => (
                        <Rating error={errors.rating} isEditable rating={field.value} ref={field.ref} setRating={field.onChange} />
                    )} />
                </div>
                <Textarea error={errors.description} {...register('description', { required: { value: true, message: 'Заполните описание' } })} placeholder='Текст отзыва' className={styles.description} />
                <div className={styles.submit}>
                    <Button appearance='primary'>Отправить</Button>
                    <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div className={styles.successTitle}>
                    Ваш отзыв отправлен
                </div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
            </div>}
            {error && <div className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу
                <CloseIcon className={styles.close} onClick={() => setError(undefined)} />
            </div>}
        </form>
    );
};
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
    title: string;
    image: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Бизнес процессы',
        image: '/img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                Здесь будет находиться описание бизнес логики
                и процессов
            </>
        ),
    },
    {
        title: 'Техническая документация',
        image: '/img/undraw_docusaurus_tree.svg',
        description: (
            <>
                Здесь будет находиться описание стека технологий,
                доступы к серверам, инструкции по развертыванию
            </>
        ),
    },
    {
        title: 'Отслеживание прогресса',
        image: '/img/undraw_docusaurus_react.svg',
        description: (
            <>
                Здесь можно посмотреть changelog проекта и узнать
                на какой стадии разработки он сейчас находится
            </>
        ),
    },
];

function Feature({ title, image, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img className={styles.featureSvg} alt={title} src={image} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}

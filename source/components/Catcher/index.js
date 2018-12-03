// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

export class Catcher extends Component {
    state = {
        error: false,
    };

    componentDidCatch(error, stack) {
        console.log('ERROR:', error.message);
        console.log('STACKTRACE:', stack.componentStack);

        this.setState({
            error: true,
        });
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>
                        Упс! Произошла 👽 &nbsp;загадочная 📛 &nbsp;ошибка.
                    </span>
                    <p>
                        Наша команда 🛰 &nbsp;инженеров быстрого реагирования 👩🏼‍🚀
                        👨🏼‍🚀 &nbsp;уже работает над решением. 🚀
                    </p>
                </section>
            );
        }

        return children;
    }
}

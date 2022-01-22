import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            outputText: "",
            calculationText: ""
        }
        this.operations = ['DEL', '+', '-', '*', '/']
    }

    calculateOutput() {
        const text = this.state.outputText
        console.log(text, eval(text))
        this.setState({
            calculationText: eval(text)
        })
    }

    validate() {
        const text = this.state.outputText
        switch(text.slice(-1)){
            case '+':
            case '-':
            case '*':
            case '/':
                return false
        }
        return true
    }

    buttonPressed(text) {
        console.log(text)

        if (text == '=') {
            return this.validate() && this.calculateOutput()
        }

        this.setState({
            outputText: this.state.outputText + text
        })
    }

    operate(operation) {
        switch(operation) {
            case 'DEL':
                console.log(this.state.outputText)
                let text = this.state.outputText.split('')
                text.pop()
                this.setState({
                    outputText: text.join('')
                })
                break
            case '+':
            case '-':
            case '*':
            case '/':
                const lastChar = this.state.outputText.split('').pop()

                if (this.operations.indexOf(lastChar) > 0) return

                if(this.state.text == "") return
                this.setState({
                    outputText: this.state.outputText + operation
                })
        }
    }

    render() {

        let rows = []
        let numberos = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
        for (let a = 0; a < 4; a++) {
            let row = []
            for (let b = 0; b < 3; b++) {
                row.push(
                <TouchableOpacity key = {numberos[a][b]} onPress = {() => this.buttonPressed(numberos[a][b])} style = {styles.btn}>
                    <Text style = {styles.btnText}>{numberos[a][b]}</Text>
                </TouchableOpacity>
                )
            }
            rows.push(<View key = {a} style = {styles.row}>{row}</View>)
        }

        let ops = []
        for (let a = 0; a < 5; a++) {
            ops.push(<TouchableOpacity key = {this.operations[a]} style = {styles.btn} onPress = {() => this.operate(this.operations[a])}>
                <Text style = {[styles.btnText, styles.whitish]}>{this.operations[a]}</Text>
            </TouchableOpacity>)
        }

        return (
            <View style = {styles.container}>
                <View style = {styles.output}>
                    <Text style = {styles.outputText}>{this.state.outputText}</Text>
                </View>
                <View style = {styles.calculate}>
                    <Text style = {styles.calculateText}>{this.state.calculationText}</Text>
                </View>
                <View style = {styles.buttons}>
                    <View style = {styles.numbers}>
                        {rows}
                    </View>
                    <View style = {styles.operations}>
                        {ops}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    outputText: {
        fontSize: 50,
        color: 'black'
    },
    calculateText: {
        fontSize: 30,
        color: '#848482'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    whitish: {
        color: 'white'
    },
    btnText: {
        fontSize: 30,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    output: {
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    calculate: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    buttons: {
        flex: 7,
        flexDirection: 'row'
    },
    numbers: {
        flex: 3,
        backgroundColor: '#085C71'
    },
    operations: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#0A7A95'
    }
});


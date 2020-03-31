import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Switch, Vibration, TouchableOpacity } from 'react-native'
import {Constants} from 'expo'

let padToTwo = (number) => (number <= 9 ? `0${number}`: number)
let intervalID = 0
let startPressed = false
let workMode = true

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 72,
  },
  caption: {
    fontSize: 36,
  },
  button: {
    flexDirection: 'row',
  },
})

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 1500,
      mode: 'Currently Working',
    }
    this.inc = this.inc.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.reset = this.reset.bind(this)
    this.skip = this.skip.bind(this)
  }

  start() {
    if (!startPressed) {
      intervalID = setInterval(this.inc, 1000)
      startPressed = !startPressed
    }
  }

  stop() {
    clearInterval(intervalID)
    startPressed = !startPressed
  }

  reset() {
    if (workMode) {
        this.setState(prevState => ({
          count: 1500,
          mode: 'Currently Working',
        })
      )}
    else {
      this.setState(prevState => ({
        count: 300,
        mode: 'On a break!',
      })
      )
    }
    this.stop()
  }

  skip() {
    workMode = !workMode
    if (workMode) {
        this.setState(prevState => ({
          count: 1500,
          mode: 'Currently Working',
        })
      )}
    else {
      this.setState(prevState => ({
        count: 300,
        mode: 'On a break!',
      })
      )
    }
    this.stop()
  }

  inc() {
    // decrease by 1 every second
    this.setState(prevState => ({
        count: prevState.count - 1,
      })
    )
    // vibrate on reaching 0 and then reset to work if breaking and break if working
    if (this.state.count === 0) {
      Vibration.vibrate(1000)
      workMode = !workMode
        if (workMode) {
            this.setState(prevState => ({
              count: 1500,
              mode: 'Currently Working',
            })
          )}
        else {
          this.setState(prevState => ({
            count: 300,
            mode: 'On a break!',
          })
          )
        }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>{this.state.mode}</Text>
        <Text style={styles.count}>{padToTwo(parseInt((this.state.count)/60))}:{padToTwo((this.state.count)%60)}</Text>
        <View style={styles.button}>
          <TouchableOpacity disabled={startPressed}>
            <Button title="Start" onPress={this.start}></Button>
          </TouchableOpacity>
          <TouchableOpacity disabled={startPressed}>
            <Button title="Stop" onPress={this.stop}></Button>
          </TouchableOpacity>
          <Button title="Reset" onPress={this.reset}></Button>
          <Button title="Skip" onPress={this.skip}></Button>
        </View>
      </View>
    )
  }
}




// copy the counting app built in lecture and understand code well
// get app to count down
// modify to get it to go down from 25 minutes to 0 caption then vibrate
// get app to count down from 25 mins and then once done, count down from 5 minutes, and then loop these two
// add a pause button to stop it at any time
// add a reset button that goes back to the beginning of the 5 or 25 minute timer
// clean up UI to make it pretty and fiddle with StyleSheets to do so

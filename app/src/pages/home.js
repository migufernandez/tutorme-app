import React from 'react'
import MenuAppBar from '../components/menuAppBar'
import withDrawer from '../components/withDrawer'
import SimpleBottomNavigation from '../components/bottomNavigation'
import { connect } from 'react-redux'
import { Button } from 'material-ui'
import hbs from '../images/hbs.jpg'

class Home extends React.Component {
  componentDidMount() {
    this.setState({ open: false })
  }

  handleChange = () => this.setState({ open: !this.state.open })

  render() {
    return (
      <div
        style={{
          flexGrow: 1,
          backgroundImage: `url(${hbs})`,
          height: '100vh',
          width: '100vw',
          zIndex: '-99'
        }}
      >
        <MenuAppBar title="TutorMe" />
        <div
          style={{
            textAlign: 'center',
            paddingTop: '100%'
          }}
        >
          <Button raised>GET STARTED</Button>
        </div>
        <SimpleBottomNavigation />
      </div>
    )
  }
}

const connector = connect(
  state => state,
  dispatch => {
    return {
      toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' })
    }
  }
)

export default withDrawer(connector(Home))

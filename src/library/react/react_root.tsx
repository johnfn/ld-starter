import React from 'react';
import ReactDOM from 'react-dom';

import { BaseGame } from '../base_game';
import { Hierarchy } from './hierarchy';

type ReactWrapperProps = {
  game: BaseGame<unknown>;
};

type ReactWrapperState = {
  debug: boolean;
};

export class GameReactWrapper extends React.Component<ReactWrapperProps, ReactWrapperState> {
  static Instance: GameReactWrapper;
  mounted = false;

  constructor(props: ReactWrapperProps) {
    super(props);

    this.state = { 
      debug: window.location.href.endsWith("?debug=true"),
    };

    setInterval(() => this.monitorHierarchyUpdates());
  }

  componentDidMount() {
    this.mounted = true;
    GameReactWrapper.Instance = this;

    setTimeout(this.monitorHierarchyUpdates, 1000);
  }

  componentWillUnmount() {
    console.error("This should never happen!!!! very bad?!?");
  }

  monitorHierarchyUpdates = () => {
    if (this.mounted) {
      this.forceUpdate();
    }
  };

  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        borderLeft: "1px solid lightgray",
        marginLeft: '16px',
        paddingLeft: '8px',
      }}>
        <div style={{
          overflow: "auto",
          height: "100vh",
        }}>
          { this.props.game && this.props.game.stage && this.state.debug && 
            <div>
              <div style={{ fontWeight: 600, fontFamily: 'arial', paddingBottom: '8px', paddingLeft: '8px' }}>Debug Hierarchy</div>
              <Hierarchy root={this.props.game.stage} />
            </div> 
          }

          {
            !this.state.debug && window.location.href.includes("localhost") &&
            <div>
              Go <a href={ window.location.href + "?debug=true"}>here</a> to see the debug view.
            </div>
          }
        </div>
      </div>
    );
  }
}

export const CreateGame = (game: BaseGame<any>) => {
  ReactDOM.render(
    <React.StrictMode>
      <GameReactWrapper
        game={ game }
      />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
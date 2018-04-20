import React, { Component } from 'react'

export default class GroupItem extends Component {
  render() {
    const { group } = this.props;
    return (
      <div>
          <tr>{group.groupName}</tr>
          <tr><button>编辑</button></tr>
          <tr><button>删除</button></tr>
      </div>
    )
  }
}

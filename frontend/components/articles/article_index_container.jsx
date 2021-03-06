import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { displayArticles, curryArticles } from '../../actions/article_actions';
import { addSourcesToState } from '../../actions/source_actions';
import ArticleIndex from './article_index';

const mSTP = state => {
  // debugger
  var articles = state.entities.articles;
  if (Object.keys(articles).length === 0) {
    let localArts = localStorage.getItem('articles')
    if(!!localArts) {
      articles = localArts
    }
  }
  var sources = state.entities.sources;
  if (Object.keys(sources).length === 0) {
    sources = JSON.parse(localStorage.getItem('sources'))
  }
  
  var pheeds = state.entities.pheeds;
  const location = document.location.href.split("/").reverse()[0];
  return {
    user: state.entities.users[state.session.id],
    articles: articles,
    sources: {0:sources},
    pheeds: pheeds,
    location
  };
}

const mDTP = dispatch => {
  return {
    showArticles: (source) => dispatch(displayArticles(source)),
    // addSourcesToState: (user) => dispatch(addSourcesToState(user)),
    curryArticles: (sources) => dispatch(curryArticles(sources))
  };
};

export default connect(mSTP, mDTP)(ArticleIndex);

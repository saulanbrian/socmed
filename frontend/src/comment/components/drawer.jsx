import React from 'react';
import { SwipeableDrawer, List, Drawer } from '@mui/material';
import Comment from './comment.jsx';
import CommentInput from './commentInput.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { styled } from '@mui/system';
import { useGetComments } from '../queries/comments.jsx';
import { useEffect, useState } from 'react';

const StyledDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    height: 400,
    maxHeight: '100%',
    maxWidth: '100%',
    paddingBottom:'20px',
  },
  '& .MuiBackdrop-root': {
    maxWidth:'100%',
  },
});

export default function CommentDrawer({ open, onClose, postId }) {
  const [enabled, setEnabled] = useState(false);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    status,
    error,
    isSuccess,
    refetch
  } = useGetComments(postId, enabled);

  useEffect(() => {
    isSuccess && console.log(data);
  }, [data]);

  useEffect(() => {
    setEnabled(true);
  }, []);

  function getDataLength(data) {
    let total = 0;
    for (let page of data.pages) {
      total += page.results.length;
    }
    return total;
  }

  return (
    <StyledDrawer id='scrollableDiv' open={open} onClose={onClose} anchor='bottom'>
      <div id='scrollableDivContent' style={{ maxHeight: '100%', height:'fit-content',overflow: 'auto',padding:4 }}>
        {data && data?.pages.length >= 1 ? (
          <InfiniteScroll
            dataLength={getDataLength(data)}
            hasMore={hasNextPage}
            next={fetchNextPage}
            loader={<p>getting more comments</p>}
            endMessage={<p>no more comments</p>}
            pullDownToRefresh
            refreshFunction={refetch}
            scrollableTarget='scrollableDivContent'
          >
            {data.pages.map(page => {
              return page.results.map(comment => (
                <Comment
                  key={comment.id}
                  authorId={comment.author_id}
                  authorName={comment.author_name}
                  authorProfile={comment.author_profile}
                  text={comment.text}
                  likes={comment.like_counts}
                  image={comment.image}
                />
              ));
            })}
          </InfiniteScroll>
        ) : isFetching ? (
          <p>please wait...</p>
        ) : (
          <p>no comments yet</p>
        )}
      </div>
      <CommentInput postId={postId} />
    </StyledDrawer>
  );
}

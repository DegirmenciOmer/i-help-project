<Grid.Column width={2}>
<Image floated='right' size='small' src={imageUrl} />
</Grid.Column>

<Grid.Column width={10}>
<Card fluid>
  <Card.Content>
    <Card.Header>{username}</Card.Header>
    <Card.Meta>
      {moment(createdAt).fromNow()}
      {`-${category}`}
    </Card.Meta>
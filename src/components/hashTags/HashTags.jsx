

export const HashTags = ({hashTags}) =>{

  const renderedHashTags = hashTags.map((hashTag) => {
    return (
      <div key={hashTag.id} className="bd-highlight text-wrap col-auto">
        <b>{hashTag.name}</b>
      </div>
    );
  });

  return <dir className="row mb-0">{renderedHashTags}</dir>
}
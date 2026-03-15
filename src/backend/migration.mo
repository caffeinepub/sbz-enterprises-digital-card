import List "mo:core/List";

module {
  type Link = {
    id : Nat;
    name : Text;
    url : Text;
    desc : Text;
    emoji : Text;
  };

  type OldActor = {};
  type NewActor = {
    links1 : List.List<Link>;
  };

  public func run(old : OldActor) : NewActor {
    { links1 = List.empty<Link>() };
  };
};

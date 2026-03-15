import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Migration "migration";
import Text "mo:core/Text";
import List "mo:core/List";

(with migration = Migration.run)
actor {
  type Link = {
    id : Nat;
    name : Text;
    url : Text;
    desc : Text;
    emoji : Text;
  };

  let links1 = List.empty<Link>();

  let defaultLinks : [Link] = [
    {
      id = 0;
      name = "Main Website";
      url = "https://web.sbze.in";
      desc = "Corporate Hub";
      emoji = "🌐";
    },
    {
      id = 1;
      name = "Rice Division";
      url = "https://rice.sbze.in";
      desc = "Premium Basmati Rice Exports";
      emoji = "🌾";
    },
    {
      id = 2;
      name = "Ivory Coast Commodities";
      url = "https://ivc.sbze.in";
      desc = "West Africa Trade";
      emoji = "🌍";
    },
    {
      id = 3;
      name = "Cashew Division";
      url = "https://kaju.sbze.in";
      desc = "Premium Cashew Exports";
      emoji = "🥜";
    },
    {
      id = 4;
      name = "Sunflower Oil Division";
      url = "https://sunvia.sbze.in";
      desc = "Edible Oil Exports";
      emoji = "🌻";
    },
  ];

  public shared ({ caller }) func getAllLinks() : async [Link] {
    defaultLinks.concat(links1.toArray());
  };

  public shared ({ caller }) func addLinkWithPin(name : Text, url : Text, desc : Text, emoji : Text, pin : Text) : async Bool {
    if (pin != "sbz2024") {
      return false;
    };
    let newId = links1.size() + 5;
    let newLink : Link = {
      id = newId;
      name;
      url;
      desc;
      emoji;
    };
    links1.add(newLink);

    true;
  };

  public shared ({ caller }) func removeLinkWithPin(id : Nat, pin : Text) : async Bool {
    if (pin != "sbz2024") {
      return false;
    };

    let originalSize = links1.size();
    let newLinks1 = links1.filter(
      func(link) {
        link.id != id and link.id >= 5
      }
    );

    if (newLinks1.size() == originalSize) {
      false;
    } else {
      links1.clear();
      newLinks1.values().forEach(func(link) { links1.add(link) });
      true;
    };
  };

  public query ({ caller }) func getDefaultLinks() : async [Link] {
    defaultLinks;
  };
};

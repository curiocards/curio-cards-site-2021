import axios from 'axios';
const graphEndpoint = 'https://gateway.thegraph.com/api/d3a8ff0c7624be9eb5a2f5e31f8b51c7/subgraphs/id/JBnWrv9pvBvSi2pUZzba3VweGBTde6s44QvsDABP47Gt';

export const getCards = async (address: string): Promise<any> => {
  var data =  await axios.post(graphEndpoint, {
    query: `
    {
        cardBalances(where : { user : "${address}" } ) {
            id
            type {
                id
            }
            unwrapped
            wrappedOfficial
            wrappedUnofficial
      }
    }
    `,
  });
  console.log("RESPONSE - ", data.data);
  return data.data.data.cardBalances;
};

export function getCardIDFromAddress(
    address: string
  ): string {
    let id = "1";
    if(address == "0x6aa2044c7a0f9e2758edae97247b03a0d7e73d6c"){
        id = "1";
    } else if(address == "0xe9a6a26598b05db855483ff5ecc5f1d0c81140c8"){
        id = "2";
    } else if(address == "0x3f8131b6e62472ceea9cb8aa67d87425248a3702"){
        id = "3";
    } else if(address == "0x4f1694be039e447b729ab11653304232ae143c69"){
        id = "4";
    } else if(address == "0x5a3d4a8575a688b53e8b270b5c1f26fd63065219"){
        id = "5";
    } else if(address == "0x1ca6ac0ce771094f0f8a383d46bf3acc9a5bf27f"){
        id = "6";
    } else if(address == "0x2647bd8777e0c66819d74ab3479372ea690912c3"){
        id = "7";
    } else if(address == "0x2fce2713a561bb019bc5a110be0a19d10581ee9e"){
        id = "8";
    } else if(address == "0xbf4cc966f1e726087c5c55aac374e687000d4d45"){
        id = "9";
    } else if(address == "0x72b34d637c0d14ace58359ef1bf472e4b4c57125"){
        id = "10";
    } else if(address == "0xb36c87f1f1539c5fc6f6e7b1c632e1840c9b66b4"){
        id = "11";
    } else if(address == "0xd15af10a258432e7227367499e785c3532b50271"){
        id = "12";
    } else if(address == "0x2d922712f5e99428c65b44f09ea389373d185bb3"){
        id = "13";
    } else if(address == "0x0565ac44e5119a3224b897de761a46a92aa28ae8"){
        id = "14";
    } else if(address == "0xdb7f262237ad8acca8922aa2c693a34d0d13e8fe"){
        id = "15";
    } else if(address == "0x1b63532ccb1fee0595c7fe2cb35cfd70ddf862cd"){
        id = "16";
    } else if(address == "0xf59536290906f204c3c7918d40c1cc5f99643d0b"){
        id = "17";
    } else if(address == "0xa507d9d28bbca54cbcffad4bb770c2ea0519f4f0"){
        id = "18";
    } else if(address == "0xf26bc97aa8afe176e275cf3b08c363f09de371fa"){
        id = "19";
    } else if(address == "0xd0ec99e99ce22f2487283a087614aee37f6b1283"){
        id = "20";
    } else if(address == "0xb7a5a84ff90e8ef91250fb56c50a7bb92a6306ee"){
        id = "21";
    } else if(address == "0x148ff761d16632da89f3d30ef3dfe34bc50ca765"){
        id = "22";
    } else if(address == "0xcde7185b5c3ed9ea68605a960f6653aa1a5b5c6c"){
        id = "23";
    } else if(address == "0xe67dad99c44547b54367e3e60fc251fc45a145c6"){
        id = "24";
    } else if(address == "0xc7f60c2b1dbdfd511685501edeb05c4194d67018"){
        id = "25";
    } else if(address == "0x1cb5bf4be53eb141b56f7e4bb36345a353b5488c"){
        id = "26";
    } else if(address == "0xfb9f3a2502d01d43167a0a6e80be03171df407e"){
        id = "27";
    } else if(address == "0x59d190e8a2583c67e62eec8da5ea7f050d8bf27e"){
        id = "28";
    } else if(address == "0xd3540bcd9c2819771f9d765edc189cbd915feabd"){
        id = "29";
    } else if(address == "0x7f5b230dc580d1e67df6ed30dee82684dd113d1f"){
        id = "30";
    } else if(address == "0xe0b5e6f32d657e0e18d4b3e801ebc76a5959e123"){
        id = "172";
    } 
    return id
  }
  
export function getCardTypeFromID(
    id: string
  ): string {
    let address = "0x";
    if(id == "1"){
      address = "0x6aa2044c7a0f9e2758edae97247b03a0d7e73d6c";
    } else if(id == "2"){
      address = "0xe9a6a26598b05db855483ff5ecc5f1d0c81140c8";
    } else if(id == "3"){
      address = "0x3f8131b6e62472ceea9cb8aa67d87425248a3702";
    } else if(id == "4"){
      address = "0x4f1694be039e447b729ab11653304232ae143c69";
    } else if(id == "5"){
      address = "0x5a3d4a8575a688b53e8b270b5c1f26fd63065219";
    } else if(id == "6"){
      address = "0x1ca6ac0ce771094f0f8a383d46bf3acc9a5bf27f";
    } else if(id == "7"){
      address = "0x2647bd8777e0c66819d74ab3479372ea690912c3";
    } else if(id == "8"){
      address = "0x2fce2713a561bb019bc5a110be0a19d10581ee9e";
    } else if(id == "9"){
      address = "0xbf4cc966f1e726087c5c55aac374e687000d4d45";
    } else if(id == "10"){
      address = "0x72b34d637c0d14ace58359ef1bf472e4b4c57125";
    } else if(id == "11"){
      address = "0xb36c87f1f1539c5fc6f6e7b1c632e1840c9b66b4";
    } else if(id == "12"){
      address = "0xd15af10a258432e7227367499e785c3532b50271";
    } else if(id == "13"){
      address = "0x2d922712f5e99428c65b44f09ea389373d185bb3";
    } else if(id == "14"){
      address = "0x0565ac44e5119a3224b897de761a46a92aa28ae8";
    } else if(id == "15"){
      address = "0xdb7f262237ad8acca8922aa2c693a34d0d13e8fe";
    } else if(id == "16"){
      address = "0x1b63532ccb1fee0595c7fe2cb35cfd70ddf862cd";
    } else if(id == "17"){
      address = "0xf59536290906f204c3c7918d40c1cc5f99643d0b";
    } else if(id == "18"){
      address = "0xa507d9d28bbca54cbcffad4bb770c2ea0519f4f0";
    } else if(id == "19"){
      address = "0xf26bc97aa8afe176e275cf3b08c363f09de371fa";
    } else if(id == "20"){
      address = "0xd0ec99e99ce22f2487283a087614aee37f6b1283";
    } else if(id == "21"){
      address = "0xb7a5a84ff90e8ef91250fb56c50a7bb92a6306ee";
    } else if(id == "22"){
      address = "0x148ff761d16632da89f3d30ef3dfe34bc50ca765";
    } else if(id == "23"){
      address = "0xcde7185b5c3ed9ea68605a960f6653aa1a5b5c6c";
    } else if(id == "24"){
      address = "0xe67dad99c44547b54367e3e60fc251fc45a145c6";
    } else if(id == "25"){
      address = "0xc7f60c2b1dbdfd511685501edeb05c4194d67018";
    } else if(id == "26"){
      address = "0x1cb5bf4be53eb141b56f7e4bb36345a353b5488c";
    } else if(id == "27"){
      address = "0xfb9f3fa2502d01d43167a0a6e80be03171df407e";
    } else if(id == "28"){
      address = "0x59d190e8a2583c67e62eec8da5ea7f050d8bf27e";
    } else if(id == "29"){
      address = "0xd3540bcd9c2819771f9d765edc189cbd915feabd";
    } else if(id == "30"){
      address = "0x7f5b230dc580d1e67df6ed30dee82684dd113d1f";
    } else if(id == "172"){
      address = "0xe0b5e6f32d657e0e18d4b3e801ebc76a5959e123";
    } else if(id == "171"){ // Just in case because we saw one with it at one point in time - James & Kent
      address = "0xe0b5e6f32d657e0e18d4b3e801ebc76a5959e123";
    }
    return address
}
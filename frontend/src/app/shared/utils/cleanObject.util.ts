export function CleanObject(object: any){
    return Object.entries(object)
      .filter(([_, v]) => v != null)
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  }
import pkg from "../../package.json";

export default class ApiResponse {
  version = pkg.version;

  constructor(
    public data: any,
    public error?: string | null,
    public message?: string
  ) {
    this.data = data || undefined;
    this.error = error || undefined;
    if (message) {
      this.message = message || undefined;
    }
  }
}

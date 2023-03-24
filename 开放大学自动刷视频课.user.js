// ==UserScript==
// @name         开放大学自动刷视频课
// @namespace    https://www.asymt.com/
// @version      0.2
// @description  可以自动刷开放大学的视频课
// @author       喻名堂
// @supportURL        https://github.com/asymt/Tampermonkey_Script
// @updateURL         https://raw.githubusercontent.com/asymt/Tampermonkey_Script/main/开放大学自动刷视频课.user.js
// @downloadURL       https://raw.githubusercontent.com/asymt/Tampermonkey_Script/main/开放大学自动刷视频课.user.js
// @match        *://lms.ouchn.cn/course/*
// @connect           lms.ouchn.cn
// @run-at            document-start
// @grant             GM_xmlhttpRequest
// @grant             GM_setClipboard
// @grant             GM_setValue
// @grant             GM_getValue
// @icon         data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogPCEtLSBDcmVhdGVkIHdpdGggTWV0aG9kIERyYXcgLSBodHRwOi8vZ2l0aHViLmNvbS9kdW9waXhlbC9NZXRob2QtRHJhdy8gLS0+CiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iI2ZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGltYWdlIHN0cm9rZT0ibnVsbCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS94LWljb247YmFzZTY0LEFBQUJBQUVBSUNBQUFBRUFJQUFvRVFBQUZnQUFBQ2dBQUFBZ0FBQUFRQUFBQUFFQUlBQUFBQUFBQUJBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWlJZUVUSWgvYUx4MGUxVXdkSDl0WElSL1hUeUVmMXpFaEg5Z1VBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDQWYyaDhoSDlwcklCL1l1UjRmMmVVZ0g5ajVJUi9iL3lFZzMvOGhJTjMvSUIvWitSNGYyT1llSDltK0lCL2FjaDBlMXlJQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQjBlMGhZZ0g5cUdJQi9hNkNFZzN2OGhJTjMvSUIvYS95QWYyZjhnSDlqL0lCL2EveUVnM3Y4aElOLy9JQi9iL3lBZjJQNGdIOW45SVIvYTVCNGYySklkSHRVaEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWVIOWRKSVIvYTJTRWczLzhnSDlyL0lCL1kveUFmMlA4Z0g5ai9JQi9hL3lFZzMvOGdIOW5ySUIvWHJDQWYyV1VnSDlrOUhoL2JLeDRlMVNvZ0g5bzBJUi9YV1I0ZTFta2VIOW9nQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlSL1liU0FmMi9jaElOei9JQi9ZL3lBZjJQOGdIOWovSUIvWS95RWczZjhoSDlydkhoL1ppUjRmMmlBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBRUloMkFVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBZjJISWdJTno5SUIvYS95QWYyUDhnSDlqL0lCL1kveUFmMlA4aElONy9JUi9heHlFZzNESUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFlSDlsV0lCL2EvQ0FmMnY4Z0g5ai9JQi9ZL3lBZjJQOGdIOWovSVNEZS95RWYySzRxSGMwUUFBQUFBQUFBQUFBQUFBQUFHUjdXR0NBZjJVY2VIOWhxSGgvWWN4NGYyR29oSDloR0d4N1ZGd0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFIUi9jSVI0ZjJlY2dIOXYvSUIvWS95QWYyUDhnSDlqL0lCL1kveUVnM3Y4Z0g5bTdHU0RmREFBQUFBQUFBQUFBSVIvWEp4NGYycFVnSDlubklCL2EveUVnMy84aElOLy9JU0RmL3lBZjJ2OGVIOW5sSUIvYWpSNGUxQ0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFlSDllZUlTRGYveUFmMlA4Z0g5ai9JQi9ZL3lBZjJQOGdIOXIvSUIvYTVCNGYyaUFBQUFBQUFBQUFBQjRmMkY4Z0g5dm9JU0RmL3lBZjJ2OGdIOWovSUIvWS95QWYyUDhnSDlqL0lCL1kveUFmMnY4aElOLy9JUi9hNHlFZTFVOEFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFHeDdWTGlBZjJmWWdIOXIvSUIvWS95QWYyUDhnSDlqL0lCL1kveUVnM2Y4Z0g5bG1BQUFBQUFBQUFBQWVIOWRzSUIvYi9TRWYyLzhnSDlqL0lCL1kveUFmMlA4Z0g5ai9JQi9ZL3lBZjJQOGdIOWovSUIvWS95QWYyUHNnSDlueElTRGM5eDRmMkZVQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFlSDlpTElTRGYveUFmMlA4Z0g5ai9JQi9ZL3lBZjJQOGhIOXYvSUIvWTF5RWYyQW9BQUFBQUloL1pRaUVmMi9ZZ0g5ci9JQi9aL3lFZzNQOGhJTjcvSVNEZi95RWczdjhoSDl2L0lCL1oveUFmMlA4Z0g5ci9JUi9ZNUNFZjJIZ2hJTi8vSUIvYThpQWUxVFFBQUFBQUFBQUFBQUFBQUFBQUFBQUFKQjdUQ1I0ZjJkVWdIOXYvSUIvWS95QWYyUDhnSDlqL0lCL1kveUVnM3Y4Z0g5ZDZBQUFBQUIwZjNBc2dIOWpOSVNEZC95RWczUDhnSDlqL0hoL1kwUjRmMTZjZ0g5bVlJUi9ZcWlBZjJOTWdIOWovSVNEYy95RWczdjhnSDlmQUhoL2FGUjRmMThZaElOL2VIaC9ZaUFBbS93RUFBQUFBQUFBQUFBQUFBQUFiSDlrdUlCL1orQ0FmMmY4Z0g5ai9JQi9ZL3lBZjJQOGdIOW4vSUIvWit4NGUxalVBQUFBQUhSN1dWeUVnM2Y4aElOMy9IaC9hd0NBZjJVY3ZITVVIQUFBQUFBQUFBQUFBQUFBQUtoM05DQ0VmMTBVaEg5cFlJQi9aU0NFZjJCNEFBQUFBVVNETkJCVWUxUTRxSXVnSUFBQUFBQUFBQUFBQUFBQUFBQUFBQUIwZjJtMGhJTjMvSUIvWS95QWYyUDhnSDlqL0lCL1kveUFmMnY4Z0g5ZmpKQ0RmRWdBQUFBQWdIOWl2SVNIaS95QWYySkFoSDlnS0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUl4N1ZKaDRmMmtrZ0g5bEhBQ2IvQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlCL1hyU0FmMi84Z0g5ai9JQi9ZL3lBZjJQOGdIOWovSVNEYy94NGYxOFlBSnY4QkdTRGZEQjRmMk9ZZUg5ZW5BQ2IvQWdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNNZTFSTWVIOWptSUIvYTRTQWYyUDhrSDlnM0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWdIOWZaSUIvYS95QWYyUDhnSDlqL0lCL1kveUFmMlA4aElONy9IaC9YdkFBQUFBQWJIOWdqSUIvWTFTUWcyeHNBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlCL2FQaUFmMlprZUg5b1ZJQi9YWFI0ZjJHb0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQjRmMlBzZ0g5ai9JQi9ZL3lBZjJQOGdIOWovSUIvYi95QWYyTlFnSDlpY0FBQUFBQjBmM0N3Z0g5aDVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQWpIdFVUQUNiL0F3QUFBQUFBQUFBQUFCckZCeVFnM3hJWkh0WXdBQkdVQWdBQUFBQUFBQUFBSVIvWTNDQWYydjhnSDlqL0lCL1kveUFmMlA4aElOLy9IaC9ZZmgwZTExZ1RIdGdQSGgvYUZSa2YyaVVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQW5JTjBSSUIvWmp5QWYydDBoSDlkRkFBQUFBUUFBQUFBZ0g5aWNJU0RjL3lBZjJ2OGhIOXYvSVNEZC95RWczLzhlSHRZL0d4L1lJeUVmMkI0QUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFSbEFJaEg5bDJJUi9ZdmgwZTFTRUFBQUFBQUFBQUFDRWYyVTBoSU56L0lCL1k1Q0FmMTg4Z0g5bkZJQi9ZcXlNZTFSTUFHTHNER0NEaURRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDd2YyQTg0SWQ4R0lSL1lDZ0FBQUFBQUFBQUFLaC9XR0NBZjJPNGdIOXJKSGgvYU5RQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUlCL1pyQ0loNC84aEg5cndJQi9hZkJVZTFRNEFBQUFBQUFBQUFBQW0vd0VBR0xzREFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDUWczeElnSDlpY0lSL1hNUUFBQUFBQUFBQUFBQUFBQUFBQUFBQWpIdFZNSUIvYS95QWYydjhoSU4vL0lCL1pSd0FBQUFBQUFBQUFBQUFBQUNRZTFTVUFKdjhDQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFFUi9hRUNBZjJYQWhIdFlkQUFBQUFBQUFBQUFBQUFBQUFBQUFBQzhjeFFjZ0g5akNJU0RmL3lFZjJlOFlIOWdaSXg3VkhCNGYyM01lSDlvVklCL1pLU0FmMlZJQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDQWYyajRnSU4zOUlCL1h0eUlmMmk4Z0g5blRJU0hoL3lBZjJ0Z2hIOWxYSUIvWHNDQWUxVWNBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFIUi9aT0JrZTFqQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNBZjJJY2dIOWpVSUIvWTR5RWczZjhnSDlqL0lCL2IveUFmMlBzaEg5andJUi9hN0NBZTFWRUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFrSU44U0toM05FQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU9DSGZCaUFmMTZzaEllSC9JQi9ZL3lBZjJQOGdIOWovSUIvWi95QWYyZjhnSDl2L0lSL2EraUVmMllrZEh0SVdBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUVJaDJBVUFKdjhFQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBR0IzUkRSNGYyS2toSU4vL0lCL2EveUFmMlA4Z0g5ai9JQi9ZL3lBZjJQOGdIOW4vSVNEZS95RWYydHdoSDlxQklSL1hNU1FpNndrQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUNiL0FTRWUxaDBoSDloa0lCL1pVU29kelFnQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFMeUxrQnlBZjJvY2hIOXY1SVNEZC95QWYyUDhnSDlqL0lCL1kveUFmMlA4Z0g5ai9JQi9hL3lFZzN2OGdIOW4zSUIvWTF4NGYyYkloSDlpZklCL2FteDRmMTZjZ0g5ckxJQi9hNGlJZjJIMGtJdXNKQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQ0VmMjBZZ0g5ckRJQi9iL3lFZzN2OGdIOXIvSUIvWS95QWYyUDhnSDlqL0lCL1kveUFmMmY4Z0g5di9JU0RlL3lFaDRmOGlJZVQvSVNEZy95QWYyc01lSDlvL0FBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFEZ2gzd1lnSDlwVElSL2FzaUFmMmVzZ0g5di9JU0RjL3lBZjJ2OGdIOXIvSUIvYS95RWczZjhnSDlyL0lCL1o1eUFmMnFzZEg5bE1BQnpOQkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBSXg3VkhCMGYyazRnSDlpWEhoL1l2aUFmMk1rZUg5ZThJUi9aaXlFZjIwWWJJTjRYQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQT09IiBpZD0ic3ZnXzEiIGhlaWdodD0iMzIiIHdpZHRoPSIzMiIvPgogPC9nPgo8L3N2Zz4=
// ==/UserScript==

(function() {
    'use strict';
    let base = {
        // 模拟鼠标点击
        emulateMouseEvent (element,type) {
            // 创建事件
            var event = document.createEvent('MouseEvents')
            // 定义事件 参数： type, bubbles, cancelable
            event.initEvent(type, true, true)
            // 触发对象可以是任何元素或其他事件目标
            element.dispatchEvent(event)
        },
        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        getStorage(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch (e) {
                return localStorage.getItem(key);
            }
        },

        setStorage(key, value) {
            if (this.isType(value) === 'object' || this.isType(value) === 'array') {
                return localStorage.setItem(key, JSON.stringify(value));
            }
            return localStorage.setItem(key, value);
        },
        isType(obj) {
            return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
        },
        post(url, data, headers, type) {
            if (this.isType(data) === 'object') {
                data = JSON.stringify(data);
            }
            return new Promise((resolve, reject) => {
                GM_xmlhttpRequest({
                    method: "POST", url, headers, data,
                    responseType: type || 'json',
                    onload: (res) => {
                        type === 'blob' ? resolve(res) : resolve(res.response || res.responseText);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                });
            });
        },

        get(url, headers, type, extra) {
            return new Promise((resolve, reject) => {
                let requestObj = GM_xmlhttpRequest({
                    method: "GET", url, headers,
                    responseType: type || 'json',
                    onload: (res) => {
                        if (res.status === 204) {
                            requestObj.abort();
                        }
                        resolve(res.response || res.responseText);
                    },
                    onprogress: (res) => {
                        if (extra && extra.filename && extra.index) {
                            res.total > 0 ? progress[extra.index] = (res.loaded * 100 / res.total).toFixed(2) : progress[extra.index] = 0.00;
                        }
                    },
                    onloadstart() {
                        extra && extra.filename && extra.index && (request[extra.index] = requestObj);
                    },
                    onerror: (err) => {
                        reject(err);
                    },
                });
            });
        }

    }

    console.log('检测到开放大学视频课学习界面！');
    const baseURL=location.protocol+"//"+location.host
        ,coursePath=location.pathname.replace(/^(\/course\/\d+).*/,'$1')
        ,courseApiURL=baseURL+"/api"+coursePath
        ,activitiesReadApiURL=baseURL+"/api/course/activities-read"
        ,courseLearningPath=coursePath+"/learning-activity/full-screen";
    let modules=[],activities=[],activeModuleIndex=-1,activeActivityIndex=-1;
    const getModules = async ()=>{
        const data=await base.get(courseApiURL.replace('course','courses')+"/modules")||{};
        return data.modules;
    }

    const getAllActivities= async moduleId=>{
        const data=await base.get(courseApiURL+"/all-activities?module_ids=["+moduleId+"]&activity_types=learning_activities,exams,classrooms")||{};
        return data.learning_activities
    }
    const getActivityRead = async activityId=>{
        return await base.post(activitiesReadApiURL+"/"+activityId);
    }

    const startNextModule = async ()=>{
        if(modules.length===0){
            modules= await getModules();
            console.log(modules)
        }
        if(++activeModuleIndex<modules.length) {
            activities =await getAllActivities(modules[activeModuleIndex].id);
            activeActivityIndex=-1;
            learningNext();
        }
    }

    const learningNext = async ()=>{
        if(++activeActivityIndex<activities.length){
            const activity=activities[activeActivityIndex];
            if(activity.type!=='online_video'){
                learningNext();
                return
            }
            const activityRead= await getActivityRead(activity.id)
            if(activityRead.completeness==='full'){
                learningNext();
                return;
            }
            const uploads=activity.uploads;
            console.log("uploads:")
            console.log(uploads)
            if(uploads===null||uploads.length===0){
                learningNext();
                return;
            }
            const videoIds=[];
            uploads.reduce((arr,upload)=>{
                if(upload.deleted||upload.status!=='ready'||upload.videos===null||upload.videos.length===0){
                    return arr;
                }
                upload.videos.reduce((vids,video)=>{
                    vids.push(video.id)
                    return vids;
                },arr);
                return arr;
            },videoIds)
            console.log("videoIds:")
            console.log(videoIds)
            if(videoIds.length===0){
                learningNext();
                return;
            }
            setTimeout(()=>{
                location.replace(baseURL+courseLearningPath+"#/"+activityRead.activity_id)
                playVideo(videoIds)
            },1000)
        }else {
            startNextModule();
        }
    }

    const playVideo = videoIds=>{
        const videoElements=document.querySelectorAll('video');
        if(videoElements.length===0){
            setTimeout(()=>{
                playVideo(videoIds);
            },1000)
            return;
        }
        const videoIdReg=new RegExp('^'+baseURL+'/api/uploads/video/('+videoIds.join("|")+').*$')
        let video;
        videoElements.forEach(element=>{
            if(videoIdReg.test(element.src)){
                video=element;
            }
        });
        if(!video){
            setTimeout(()=>{
                playVideo(videoIds);
            },1000)
            return;
        }
        video.muted="muted";
        video.onended=()=>{
            console.log("onended is trigger!")
            setTimeout(learningNext,1000);
        }
        video.onpause=()=>{
            console.log("onpause is trigger!")
            clickPlayButton();
        }
        video.oncanplay=()=>{
            console.log("oncanplay is trigger!")
        }
        setTimeout(clickPlayButton,500);
    }
    const clickPlayButton = ()=>{
        console.log("play button element count：")
        console.log(document.querySelectorAll('.mvp-toggle-play').length);
        if(document.querySelectorAll('.mvp-toggle-play').length){
            base.emulateMouseEvent(document.querySelectorAll('.mvp-toggle-play')[0],'click');
        }else {
            setTimeout(clickPlayButton,500);
        }
    }
    let main = {
        init(){
            const Reg=new RegExp('^'+courseLearningPath+'$')
            if(Reg.test(location.pathname)){
                startNextModule();
            }else {
                location.replace(baseURL+courseLearningPath);
            }
        }
    }
    main.init();
    if (window.onurlchange === null) {
        // feature is supported
        window.addEventListener('urlchange', (info) => {
            console.log('urlchanged');
            const Reg=new RegExp('^'+courseLearningPath+'$')
            if(Reg.test(location.pathname)&&/^#\/\d+$/.test(location.hash)){
                setTimeout(clickPlayButton,500);
            }
        });
    }
    // Your code here...
})();

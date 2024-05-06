/**
 * @openapi
 * paths:
 *   /api/basicInfo:
 *     get:
 *       summary: Get stock information
 *       description: |
 *         Retrieves stock information from the database. If no `dataId` query parameter is provided, it returns all stock data for the `TaiwanStockInfo` dataset. If `dataId` is provided along with the `dataset` query parameter, it returns information for a specific stock.
 *       parameters:
 *         - in: query
 *           name: dataset
 *           description: Dataset name (required)
 *           required: true
 *           schema:
 *             type: string
 *             default: TaiwanStockInfo
 *         - in: query
 *           name: dataId
 *           description: Stock ID (optional)
 *           schema:
 *             type: integer
 *       servers:
 *         - url: https://15.152.187.152/
 *       responses:
 *         '200':
 *           description: Stock information retrieved successfully
 *         '204':
 *           description: No content (if the provided dataId does not exist)
 *         '400':
 *           description: Bad request (if dataset query parameter is missing)
 *         '404':
 *           description: Not found (if the provided dataId does not exist)
 *         '500':
 *           description: Internal server error
 */

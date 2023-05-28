using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace WebhookServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WebhookController : ControllerBase
    {

        [HttpPost("register/{event}")]
        public async Task<IActionResult> Register(string @event, [FromBody] string endpointUrl)
        {
            string filename = $"{@event}.txt";
            string[] existingEndpoints = System.IO.File.ReadAllLines(filename);
            // file deepcode ignore PT: <please specify a reason of ignoring this>
            if (!existingEndpoints.Contains(endpointUrl))
            {
                System.IO.File.AppendAllText(filename, $"{endpointUrl}\n");

                // Send a "ping" event to the registered webhook URL
                using HttpClient httpClient = new HttpClient();
                var pingEventData = new
                {
                    event_type = "ping",
                    message = "Webhook registered successfully."
                };
                string pingEventJson = JsonSerializer.Serialize(pingEventData);
                StringContent pingEventContent = new StringContent(pingEventJson, Encoding.UTF8, "application/json");
                // file deepcode ignore Ssrf: <please specify a reason of ignoring this>
                await httpClient.PostAsync(endpointUrl, pingEventContent);
            }
            return Ok("Webhook registered.");
        }

        [HttpPost("unregister/{event}")]
        public async Task<IActionResult> Unregister(string @event, [FromBody] string endpointUrl)
        {
            string filename = $"{@event}.txt";
            string[] existingEndpoints = System.IO.File.ReadAllLines(filename);
            string[] updatedEndpoints = existingEndpoints.Where(x => x != endpointUrl).ToArray();
            System.IO.File.WriteAllLines(filename, updatedEndpoints);

            // Send a "ping" event to the unregistered webhook URL
            using HttpClient httpClient = new HttpClient();
            var pingEventData = new
            {
                event_type = "ping",
                message = "Webhook unregistered successfully."
            };
            string pingEventJson = JsonSerializer.Serialize(pingEventData);
            StringContent pingEventContent = new StringContent(pingEventJson, Encoding.UTF8, "application/json");
            await httpClient.PostAsync(endpointUrl, pingEventContent);

            return Ok("Webhook unregistered.");
        }

        [HttpPost("trigger/{event}")]
        public async Task<IActionResult> TriggerEvent(string @event)
        {
            string[] validEvents = { "payment_received", "payment_processed", "invoice_processing", "invoice_completed" };

            if (!validEvents.Contains(@event))
            {
                return BadRequest($"Invalid event {@event}. Valid events are {string.Join(", ", validEvents)}.");
            }

            string filename = $"{@event}.txt";
            string[] registeredEndpoints = System.IO.File.ReadAllLines(filename);

            using HttpClient httpClient = new HttpClient();

            var eventData = new
            {
                event_type = @event,
                message = $"Event {@event} triggered."
            };

            string eventJson = JsonSerializer.Serialize(eventData);
            StringContent eventContent = new StringContent(eventJson, Encoding.UTF8, "application/json");

            foreach (string endpointUrl in registeredEndpoints)
            {
                await httpClient.PostAsync(endpointUrl, eventContent);
            }

            return Ok($"Event {@event} triggered for {registeredEndpoints.Length} webhooks.");
        }

    }
}